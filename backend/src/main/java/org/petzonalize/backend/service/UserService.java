package org.petzonalize.backend.service;

import java.util.List;

import org.petzonalize.backend.entity.User;

import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<List<User>> getUsers();
	ResponseEntity<User> createUser(User user);
	ResponseEntity<String> deleteUser(String email);
	ResponseEntity<User> updateUser(User user);
}
