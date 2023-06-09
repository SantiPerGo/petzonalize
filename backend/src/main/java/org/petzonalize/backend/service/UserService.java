package org.petzonalize.backend.service;

import org.petzonalize.backend.dto.UserDto;
import org.petzonalize.backend.entity.User;
import org.springframework.http.ResponseEntity;

public interface UserService {
    /**
     * Retrieves the list of users (without password).
     * @return Response entity with the list of users
     */
    ResponseEntity<?> getUsers();

    /**
     * Creates a new user.
     * @param user The user to be created
     * @return Response entity with the created user (without password) or an error message
     */
    ResponseEntity<?> createUser(User user);

    /**
     * Deletes a user.
     * @param userLogin The user's login details (email and password)
     * @return Response entity with a success message or an error message
     */
    ResponseEntity<String> deleteUser(UserDto userLogin);

    /**
     * Updates an existing user.
     * @param user The updated user information
     * @return Response entity with the updated user (without password) or an error message
     */
    ResponseEntity<?> updateUser(User user);

    /**
     * Sends a password recovery email to the user with the provided email.
     * @param email The user's email
     * @return Response entity with a success message or an error message
     */
    ResponseEntity<?> recoverPassword(String email);

    /**
     * Authenticates a user's login credentials.
     * @param userLogin The user's login details (email and password)
     * @return Response entity with the authenticated user (without password) or an error message
     */
    ResponseEntity<?> login(UserDto userLogin);
}
