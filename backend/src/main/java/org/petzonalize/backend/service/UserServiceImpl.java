package org.petzonalize.backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.petzonalize.backend.custom.UserNoPassword;
import org.petzonalize.backend.entity.User;
import org.petzonalize.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("userService")
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    
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

            return new ResponseEntity<>(
            		userRepository.saveAndFlush(newUser), HttpStatus.CREATED);
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
		
		if(optionalUser.isPresent()) {
            user.setId(optionalUser.get().getId());
            user.setPrivileges(optionalUser.get().getPrivileges());
            return new ResponseEntity<>(userRepository.saveAndFlush(user), HttpStatus.OK);
		} else 
			return new ResponseEntity<>(
            		"User with id '" + user.getId() + "' doesn't exist",
            		HttpStatus.NOT_FOUND);
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
}
