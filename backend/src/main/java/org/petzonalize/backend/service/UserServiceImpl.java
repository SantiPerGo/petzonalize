package org.petzonalize.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.petzonalize.backend.custom_class.EmailService;
import org.petzonalize.backend.custom_class.LoginRequest;
import org.petzonalize.backend.custom_class.UserNoPassword;
import org.petzonalize.backend.entity.User;
import org.petzonalize.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service("userService")
public class UserServiceImpl implements UserService {	
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TemplateEngine templateEngine;
    
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
            		HttpStatus.CONFLICT);
		else {
            User newUser = User.builder()
                    .name(user.getName())
                    .email(user.getEmail())
                    .phone(user.getPhone())
                    .password(user.getPassword())
                    .privileges("client")
                    .build();

        	return new ResponseEntity<>(
            	userRepository.saveAndFlush(newUser), HttpStatus.CREATED);
		}
	}

	@Override
	public ResponseEntity<String> deleteUser(int id){
		Optional<User> optionalUser = userRepository.findById(id);
		
		if(!optionalUser.isPresent())
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
            return new ResponseEntity<>(userRepository.saveAndFlush(user), HttpStatus.OK);
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
		if(email.isBlank())
			return new ResponseEntity<>("User email (string) cannot be null or empty",
				HttpStatus.BAD_REQUEST);
		else {
			Optional<User> optionalUser = userRepository.findByEmail(email);
			
			if(!optionalUser.isPresent())
				return new ResponseEntity<>(
	            		"User with id '" + email + "' doesn't exist", HttpStatus.NOT_FOUND);
			else {
		        String subject = "Petzonalize - Recuperación de Contraseña";
		        
		        // Loading HTML with Thymeleaf
		        Context context = new Context();
                context.setVariable("email", email);
                context.setVariable("password", optionalUser.get().getPassword());
                String htmlContent = templateEngine.process("password_recovery", context);

				emailService.sendEmail(email, subject, htmlContent);
		        return new ResponseEntity<>("User password sent to email!", HttpStatus.OK);
			}
		}
	}
	
	@Override
	public ResponseEntity<?> login(LoginRequest loginRequest) {
		Optional<User> optionalUser = userRepository.findByEmail(loginRequest.getEmail());
		
		if(!optionalUser.isPresent())
			return new ResponseEntity<>("User with email '" + loginRequest.getEmail()
				+ "' doesn't exist", HttpStatus.NOT_FOUND);
		else {
			if(optionalUser.get().getPassword().equals(loginRequest.getPassword()))
				return new ResponseEntity<>("User credentials are correct!", HttpStatus.OK);
			else
				return new ResponseEntity<>("User password incorrect!", HttpStatus.BAD_REQUEST);
		}
	}
}
