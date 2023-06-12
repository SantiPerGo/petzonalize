package org.petzonalize.backend.controller;

import org.petzonalize.backend.dto.HttpResponseDto;
import org.petzonalize.backend.dto.UserLoginDto;
import org.petzonalize.backend.dto.UserNoPasswordDto;
import org.petzonalize.backend.entity.User;
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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins="*")
@ApiResponse(responseCode = "400", description = "Bad request",
	content = @Content(mediaType = "application/json",
		schema = @Schema(implementation = HttpResponseDto.class)))
@Tag(name = "User Endpoints",
	description = "CRUD for users, including login and password recovery by sending email.")
public class UserController {
	@Autowired
	private UserService userService;

    @Operation(summary = "Get all users (without passwords)")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful query!",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = UserNoPasswordDto.class, type = "List"))),
        @ApiResponse(responseCode = "404", description = "Users not found!",
        	content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = HttpResponseDto.class)))
    })
    @GetMapping
    public ResponseEntity<?> getUsers() {
    	return userService.getUsers();
    }

    @Operation(summary = "Create a user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful user creation!",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = User.class))),
        @ApiResponse(responseCode = "409", description = "User already exists",
        	content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = HttpResponseDto.class)))
    })
    @PostMapping
	public ResponseEntity<?> createUser(@RequestBody final User user) {
    	return userService.createUser(user);
	}

    @Operation(summary = "Delete user with email and password")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful deletion!",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = UserLoginDto.class))),
        @ApiResponse(responseCode = "404", description = "User not found!",
        	content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = HttpResponseDto.class)))
    })
    @DeleteMapping
    public ResponseEntity<?> deleteUser(@RequestBody UserLoginDto userLogin) {
        return userService.deleteUser(userLogin);
    }

    @Operation(summary = "Update user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful update!",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = User.class))),
        @ApiResponse(responseCode = "404", description = "User not found!",
        	content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = HttpResponseDto.class)))
    })
    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody User user){
        return userService.updateUser(user);
    }

    @Operation(summary = "Recover password with email")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Password sent to email successfully!",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = HttpResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "User not found!",
        	content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = HttpResponseDto.class)))
    })
    @GetMapping("{email}")
	public ResponseEntity<?> recoverPassword(@PathVariable String email) {
    	return userService.recoverPassword(email);
	}

    @Operation(summary = "Login with email and password")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful login!",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = UserLoginDto.class))),
        @ApiResponse(responseCode = "404", description = "User not found!",
        	content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = HttpResponseDto.class)))
    })
    @PostMapping("login")
	public ResponseEntity<?> login(@RequestBody UserLoginDto userLogin) {
    	return userService.login(userLogin);
	}
}
