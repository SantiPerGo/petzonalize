package org.petzonalize.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.petzonalize.backend.custom_class.EmailService;
import org.petzonalize.backend.custom_class.UserNoPassword;
import org.petzonalize.backend.entity.User;
import org.petzonalize.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@Service("userService")
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    
    private final EmailService emailService;

    @Autowired
    public UserServiceImpl(EmailService emailService) {
        this.emailService = emailService;
    }
    
	@Override
	public ResponseEntity<?> createUser(User user) {
		Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
		
		if(optionalUser.isPresent())
            return new ResponseEntity<>(
            		"User with email '" + user.getEmail() + "' already exists",
            		HttpStatus.BAD_REQUEST);
		else {
            User newUser = User.builder()
                    .name(user.getName())
                    .email(user.getEmail())
                    .phone(user.getPhone())
                    .password(user.getPassword())
                    .privileges("client")
                    .build();

            try {
            	return new ResponseEntity<>(
                		userRepository.saveAndFlush(newUser), HttpStatus.CREATED);
            } catch(ConstraintViolationException cve) {
            	ArrayList<String> exceptionsList = new ArrayList<>();
            	
            	for(ConstraintViolation<?> violation: cve.getConstraintViolations())
            		exceptionsList.add("error-" + violation.getPropertyPath()
            			+ ": " + violation.getMessage());
            	
                return new ResponseEntity<>(exceptionsList, HttpStatus.BAD_REQUEST);
            }
		}
	}

	@Transactional
	@Override
	public ResponseEntity<String> deleteUser(int id){
		Optional<User> optionalUser = userRepository.findById(id);
		
		if(optionalUser.isPresent())
			return new ResponseEntity<>(
            		"User with id '" + id + "' doesn't exist", HttpStatus.NOT_FOUND);
		else {
	        userRepository.deleteById(id);
	        return new ResponseEntity<>(
	        		"User with id '" + id + "' successfully removed!", HttpStatus.OK);
		}
	}

	@Override
	public ResponseEntity<?> updateUser(User user) {
        Optional<User> optionalUser = userRepository.findById(user.getId());
		
		if(!optionalUser.isPresent())
			return new ResponseEntity<>(
            	"User with id '" + user.getId() + "' doesn't exist", HttpStatus.NOT_FOUND);
		else {
            user.setId(optionalUser.get().getId());
            user.setPrivileges(optionalUser.get().getPrivileges());
            
            try {
                return new ResponseEntity<>(userRepository.saveAndFlush(user), HttpStatus.OK);
            } catch(ConstraintViolationException violationEx) {
            	ArrayList<String> exceptionsList = new ArrayList<>();
            	
            	for(ConstraintViolation<?> violation: violationEx.getConstraintViolations())
            		exceptionsList.add("error-" + violation.getPropertyPath()
            			+ ": " + violation.getMessage());
            	
                return new ResponseEntity<>(exceptionsList, HttpStatus.BAD_REQUEST);
            } 
		}
	}

	@Override
	public ResponseEntity<?> getUsers() {
        List<User> usersList = userRepository.findAll();
		
        if(usersList.size() == 0)
			return new ResponseEntity<>(
            		"There are no users to send as an answer", HttpStatus.NOT_FOUND);
        else {
            List<UserNoPassword> usersNoPasswordList = new ArrayList<>();
            
            // Removing password from response
            for (User user : usersList) {
            	UserNoPassword userNoPassword = UserNoPassword.builder()
            			.id(user.getId())
                        .name(user.getName())
                        .email(user.getEmail())
                        .phone(user.getPhone())
                        .privileges(user.getPrivileges())
                        .build();
            	
            	usersNoPasswordList.add(userNoPassword);
            }
            
        	return new ResponseEntity<>(usersNoPasswordList, HttpStatus.OK);
        }
	}
	
	@Override
	public ResponseEntity<?> recoverPassword(String email) {
		Optional<User> optionalUser = userRepository.findByEmail(email);
		
		if(optionalUser.isPresent())
			return new ResponseEntity<>(
            		"User with id '" + email + "' doesn't exist", HttpStatus.NOT_FOUND);
		else {
	        String subject = "Petzonalize - Account Password Recuperation";
	        String content = "<h1>Hello, This is an email using Elastic Email!</h1>";

			emailService.sendEmail(email, subject, content);
	        return new ResponseEntity<>("User password sent to email!", HttpStatus.OK);
		}
	}
}
