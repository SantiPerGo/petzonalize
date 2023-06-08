package org.petzonalize.backend.controller;

import org.petzonalize.backend.custom.UserLogin;
import org.petzonalize.backend.entity.model.User;
import org.petzonalize.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin(origins="*")
public class UserController {
	@Autowired
	private UserService userService;
	
    @GetMapping
    public ResponseEntity<?> getUsers() {
    	return userService.getUsers();
    }
	
    @PostMapping
	public ResponseEntity<?> createUser(@RequestBody final User user) {
    	return userService.createUser(user);
	}
    
    @DeleteMapping
    public ResponseEntity<String> deleteUser(@RequestBody UserLogin userLogin) {
        return userService.deleteUser(userLogin);
    }
    
    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody User user){
        return userService.updateUser(user);
    }
    
    @GetMapping("{email}")
	public ResponseEntity<?> recoverPassword(@PathVariable String email) {
    	return userService.recoverPassword(email);
	}
    
    @PostMapping("login")
	public ResponseEntity<?> login(@RequestBody UserLogin userLogin) {
    	return userService.login(userLogin);
	}
}
