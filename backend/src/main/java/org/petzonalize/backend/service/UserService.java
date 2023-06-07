package org.petzonalize.backend.service;

import org.petzonalize.backend.entity.User;

import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<?> getUsers();
	ResponseEntity<?> createUser(User user);
	ResponseEntity<String> deleteUser(int id);
	ResponseEntity<?> updateUser(User user);
	ResponseEntity<?> recoverPassword(String email);
}
