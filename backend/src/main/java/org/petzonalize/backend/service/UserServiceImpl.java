package org.petzonalize.backend.service;

import java.util.List;
import java.util.Optional;

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
	public ResponseEntity<User> createUser(User user) {
		Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
		
		if(optionalUser.isPresent())
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		else {
            User newUser = User.builder()
                    .name(user.getName())
                    .email(user.getEmail())
                    .phone(user.getPhone())
                    .password(user.getPassword())
                    .privileges("client")
                    .build();

            return new ResponseEntity<>(userRepository.saveAndFlush(newUser), HttpStatus.OK);
		}
	}

	@Transactional
	@Override
	public ResponseEntity<String> deleteUser(String email) {
		System.out.println(email);
		userRepository.deleteByEmail(email);
        return new ResponseEntity<>(null, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<User> updateUser(User user) {
		Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
		
		if(optionalUser.isPresent()) {
            user.setId(optionalUser.get().getId());
            user.setPrivileges(optionalUser.get().getPrivileges());
            return new ResponseEntity<>(userRepository.saveAndFlush(user), HttpStatus.OK);
		} else 
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
	}

	@Override
	public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
	}
}
