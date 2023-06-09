package org.petzonalize.backend.service;

import org.petzonalize.backend.dto.UserDTO;
import org.petzonalize.backend.entity.User;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<?> getUsers();
	ResponseEntity<?> createUser(User user);
	ResponseEntity<String> deleteUser(UserDTO userLogin);
	ResponseEntity<?> updateUser(User user);
	ResponseEntity<?> recoverPassword(String email);
	ResponseEntity<?> login(UserDTO userLogin);
}
