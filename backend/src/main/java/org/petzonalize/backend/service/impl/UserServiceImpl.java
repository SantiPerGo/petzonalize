package org.petzonalize.backend.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.petzonalize.backend.dto.UserLoginDto;
import org.petzonalize.backend.dto.UserWithPrivilegeDto;
import org.petzonalize.backend.entity.Privilege;
import org.petzonalize.backend.entity.User;
import org.petzonalize.backend.entity.UserHasPrivilege;
import org.petzonalize.backend.mapper.ProductMapper;
import org.petzonalize.backend.mapper.UserHasPrivilegeMapper;
import org.petzonalize.backend.mapper.UserMapper;
import org.petzonalize.backend.repository.PrivilegeRepository;
import org.petzonalize.backend.repository.ProductRepository;
import org.petzonalize.backend.repository.UserHasPrivilegeRepository;
import org.petzonalize.backend.repository.UserRepository;
import org.petzonalize.backend.service.UserService;
import org.petzonalize.backend.utils.EmailUtils;
import org.petzonalize.backend.utils.ResponseUtils;
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
    private ProductRepository productRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PrivilegeRepository privilegeRepository;

    @Autowired
    private UserHasPrivilegeRepository userHasPrivilegeRepository;

    @Autowired
    private TemplateEngine templateEngine;
    
    private final EmailUtils emailUtils;
    public UserServiceImpl(EmailUtils emailUtils) {
        this.emailUtils = emailUtils;
    }
    
	@Override
	public ResponseEntity<?> createUser(User user) {
		Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
		
		if(optionalUser.isPresent())
			return ResponseUtils.mapToJsonResponse(
					"User with email '" + user.getEmail() + "' already exists",
            		HttpStatus.CONFLICT);
		else {
			Privilege clientPrivilege =
				privilegeRepository.findByPrivilege("client").get();
					
            user.setId(null);
			userRepository.saveAndFlush(user);
        	
        	userHasPrivilegeRepository.saveAndFlush(
    			UserHasPrivilegeMapper.mapToUserHasPrivilege(user, clientPrivilege)
			);
        	        	
        	return new ResponseEntity<>(
        			UserMapper.mapToUserWithoutPassword(user), HttpStatus.CREATED);
		}
	}

	@Transactional
	@Override
	public ResponseEntity<?> deleteUser(UserLoginDto userLogin){
		Optional<User> optionalUser = userRepository.findByEmail(userLogin.getEmail());
		
		if(!optionalUser.isPresent())
			return ResponseUtils.mapToJsonResponse(
					"User with email '" + userLogin.getEmail() + "' doesn't exists",
            		HttpStatus.NOT_FOUND);
		else {
			if(optionalUser.get().getPassword().equals(userLogin.getPassword())) {
				userRepository.deleteByEmail(userLogin.getEmail());
				return ResponseUtils.mapToJsonResponse(
					"User with email '" + userLogin.getEmail() + "' successfully removed!",
					HttpStatus.OK);
			} else
				return ResponseUtils.mapToJsonResponse(
					"User password incorrect!", HttpStatus.BAD_REQUEST);
		}
	}

	@Override
	public ResponseEntity<?> updateUser(User user) {
        Optional<User> optionalUser = userRepository.findById(user.getId());
		
		if(!optionalUser.isPresent())
			return ResponseUtils.mapToJsonResponse(
				"User with id '" + user.getId() + "' doesn't exist", HttpStatus.NOT_FOUND);
		else {
            user.setId(optionalUser.get().getId());
            userRepository.saveAndFlush(user);
            
            return new ResponseEntity<>(
        		UserMapper.mapToUserWithoutPassword(user),
        		HttpStatus.OK);
		}
	}

	@Override
	public ResponseEntity<?> getUsers() {
        List<UserHasPrivilege> usersList = userHasPrivilegeRepository.findAll();
		
        if(usersList.size() == 0)
			return ResponseUtils.mapToJsonResponse(
				"There are no users to send as an answer", HttpStatus.NOT_FOUND);
        else {
        	// Removing password from response with Stream
            List<UserWithPrivilegeDto> usersWithPrivilegesList =
        		usersList.stream()
        		.map(user -> UserMapper.mapToUserWithPrivilege(user))
        		.collect(Collectors.toList());
            
        	return new ResponseEntity<>(usersWithPrivilegesList, HttpStatus.OK);
        }
	}
	
	@Override
	public ResponseEntity<?> recoverPassword(String email) {
		if(email.isBlank())
			return ResponseUtils.mapToJsonResponse(
				"User email (string) cannot be null or empty", HttpStatus.BAD_REQUEST);
		else {
			Optional<User> optionalUser = userRepository.findByEmail(email);
			
			if(!optionalUser.isPresent())
				return ResponseUtils.mapToJsonResponse(
            		"User with id '" + email + "' doesn't exist", HttpStatus.NOT_FOUND);
			else {
		        String subject = "Petzonalize - Recuperación de Contraseña";
		        String logoUrl = ProductMapper.getProductUrlByName(
		        		productRepository.findAll(), "Logo.png");
		        
		        // Loading HTML with Thymeleaf
		        Context context = new Context();
                context.setVariable("logoUrl", logoUrl);
                context.setVariable("email", email);
                context.setVariable("password", optionalUser.get().getPassword());
                String htmlContent = templateEngine.process("password_recovery", context);

                emailUtils.sendEmail(email, subject, htmlContent);
				return ResponseUtils.mapToJsonResponse(
					"User password sent to email!", HttpStatus.OK);
			}
		}
	}
	
	@Override
	public ResponseEntity<?> login(UserLoginDto userLogin) {
		Optional<User> optionalUser = userRepository.findByEmail(userLogin.getEmail());
		
		if(!optionalUser.isPresent())
			return ResponseUtils.mapToJsonResponse("User with email '" + userLogin.getEmail()
				+ "' doesn't exist", HttpStatus.NOT_FOUND);
		else {
			if(optionalUser.get().getPassword().equals(userLogin.getPassword()))           	
				return new ResponseEntity<>(
					UserMapper.mapToUserWithoutPassword(optionalUser.get()),
					HttpStatus.OK);
			else
				return ResponseUtils.mapToJsonResponse(
					"User password incorrect!", HttpStatus.BAD_REQUEST);
		}
	}
}
