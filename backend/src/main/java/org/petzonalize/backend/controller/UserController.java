package org.petzonalize.backend.controller;

import org.petzonalize.backend.custom_class.LoginRequest;
import org.petzonalize.backend.entity.User;
import org.petzonalize.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
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
	
	@ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<String> handleNotReadableException(HttpMessageNotReadableException ex) {
        return new ResponseEntity<>("Error: " + ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
	
    @GetMapping
    public ResponseEntity<?> getUsers() {
    	return userService.getUsers();
    }
	
    @PostMapping
	public ResponseEntity<?> createUser(@RequestBody final User user) {
    	return userService.createUser(user);
	}
    
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        return userService.deleteUser(id);
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
	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
    	return userService.login(loginRequest);
	}
}
