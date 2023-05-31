package org.petzonalize.backend.controller;

import java.util.List;

import org.petzonalize.backend.entity.User;
import org.petzonalize.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserService userService;
	
    @GetMapping(produces = "application/json")
    public ResponseEntity<List<User>> getUsers() {
    	return userService.getUsers();
    }
	
    @PostMapping(produces = "application/json")
	public ResponseEntity<User> createUser(@RequestBody final User user) {
    	return userService.createUser(user);
	}
    
    @DeleteMapping(value = "{email}", produces = "application/json")
    public ResponseEntity<String> deleteUser(@PathVariable final String email) {
        return userService.deleteUser(email);
    }
    
    @PutMapping(produces = "application/json")
    public ResponseEntity<User> updateUser(@RequestBody final User user){
        return userService.updateUser(user);
    }
}
