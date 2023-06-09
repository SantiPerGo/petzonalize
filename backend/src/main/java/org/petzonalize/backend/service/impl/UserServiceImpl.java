package org.petzonalize.backend.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.petzonalize.backend.dto.UserDTO;
import org.petzonalize.backend.entity.Privilege;
import org.petzonalize.backend.entity.User;
import org.petzonalize.backend.entity.UserHasPrivilege;
import org.petzonalize.backend.repository.PrivilegeRepository;
import org.petzonalize.backend.repository.UserHasPrivilegeRepository;
import org.petzonalize.backend.repository.UserRepository;
import org.petzonalize.backend.service.UserService;
import org.petzonalize.backend.utils.EmailService;
import org.petzonalize.backend.utils.FirebaseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.transaction.Transactional;

@Service("userService")
public class UserServiceImpl implements UserService {	
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PrivilegeRepository privilegeRepository;

    @Autowired
    private UserHasPrivilegeRepository userHasPrivilegeRepository;
    
    @Autowired
    private FirebaseHandler firebaseHandler;

    @Autowired
    private TemplateEngine templateEngine;
    
    private final EmailService emailService;
    public UserServiceImpl(EmailService emailService) {
        this.emailService = emailService;
    }
    
    // TODO: return user without password
	@Override
	public ResponseEntity<?> createUser(User user) {
		Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
		
		if(optionalUser.isPresent())
            return new ResponseEntity<>(
            		"User with email '" + user.getEmail() + "' already exists",
            		HttpStatus.CONFLICT);
		else {
			Privilege clientPrivilege =
				privilegeRepository.findByPrivilege("client").get();
					
            User newUser = User.builder()
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .password(user.getPassword())
                .privileges(clientPrivilege)
                .build();

            userRepository.saveAndFlush(newUser);
            
        	UserHasPrivilege userHasPrivilege = UserHasPrivilege.builder()
    			.user(newUser)
    			.privilege(clientPrivilege)
    			.build();
        	
        	userHasPrivilegeRepository.saveAndFlush(userHasPrivilege);
        	
        	// TODO: user no password dto
        	
        	User userNoPassword = User.builder()
    			.id(newUser.getId())
                .name(newUser.getName())
                .email(newUser.getEmail())
                .phone(newUser.getPhone())
                .privileges(newUser.getPrivileges())
                .build();
        	
        	return new ResponseEntity<>(userNoPassword, HttpStatus.CREATED);
		}
	}

	@Transactional
	@Override
	public ResponseEntity<String> deleteUser(UserDTO userLogin){
		Optional<User> optionalUser = userRepository.findByEmail(userLogin.getEmail());
		
		if(!optionalUser.isPresent())
			return new ResponseEntity<>(
            		"User with email '" + userLogin.getEmail() + "' doesn't exist", HttpStatus.NOT_FOUND);
		else {
			if(optionalUser.get().getPassword().equals(userLogin.getPassword())) {
				userRepository.deleteByEmail(userLogin.getEmail());
		        return new ResponseEntity<>(
		        	"User with email '" + userLogin.getEmail() + "' successfully removed!", HttpStatus.OK);
			} else
				return new ResponseEntity<>("User password incorrect!", HttpStatus.BAD_REQUEST);
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
            userRepository.saveAndFlush(user);

        	User userNoPassword = User.builder()
    			.id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .privileges(user.getPrivileges())
                .build();
            
            return new ResponseEntity<>(userNoPassword, HttpStatus.OK);
		}
	}

	@Override
	public ResponseEntity<?> getUsers() {
        List<User> usersList = userRepository.findAll();
		
        if(usersList.size() == 0)
			return new ResponseEntity<>(
            		"There are no users to send as an answer", HttpStatus.NOT_FOUND);
        else {
            List<User> usersNoPasswordList = new ArrayList<>();
            
            // Removing password from response
            for (User user : usersList) {
            	User userNoPassword = User.builder()
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
		        
		        List<String> imageUrls = firebaseHandler.getImagesFromFirebaseStorage();
		        String imageUrl = firebaseHandler.getImageUrlByName(imageUrls, "Logo.png");
		        
		        // Loading HTML with Thymeleaf
		        Context context = new Context();
                context.setVariable("imgUrl", imageUrl);
                context.setVariable("email", email);
                context.setVariable("password", optionalUser.get().getPassword());
                String htmlContent = templateEngine.process("password_recovery", context);

				emailService.sendEmail(email, subject, htmlContent);
		        return new ResponseEntity<>("User password sent to email!", HttpStatus.OK);
			}
		}
	}
	
	@Override
	public ResponseEntity<?> login(UserDTO userLogin) {
		Optional<User> optionalUser = userRepository.findByEmail(userLogin.getEmail());
		
		if(!optionalUser.isPresent())
			return new ResponseEntity<>("User with email '" + userLogin.getEmail()
				+ "' doesn't exist", HttpStatus.NOT_FOUND);
		else {
			if(optionalUser.get().getPassword().equals(userLogin.getPassword())) {
            	User user = optionalUser.get();
            	
				User userNoPassword = User.builder()
        			.id(user.getId())
                    .name(user.getName())
                    .email(user.getEmail())
                    .phone(user.getPhone())
                    .privileges(user.getPrivileges())
                    .build();
            	
				return new ResponseEntity<>(userNoPassword, HttpStatus.OK);
			} else
				return new ResponseEntity<>("User password incorrect!", HttpStatus.BAD_REQUEST);
		}
	}
}
