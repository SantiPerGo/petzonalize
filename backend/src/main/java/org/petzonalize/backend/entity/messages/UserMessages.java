package org.petzonalize.backend.entity.messages;

public interface UserMessages {	
	int USERNAME_MAX = 50;
	String USERNAME_NULL = "Username (string) cannot be null or empty";
    String USERNAME_SIZE = "Username cannot be longer than 50 characters";

	int USER_EMAIL_MAX = 50;
    String USER_EMAIL_NULL = "User email (string) cannot be null or empty";
    String USER_EMAIL_SIZE = "User email cannot be longer than 50 characters";

	int USER_PHONE_MIN = 8, USER_PHONE_MAX = 15;
    String USER_PHONE_NULL = "User phone (string) cannot be null or empty";
    String USER_PHONE_SIZE = "User phone cannot be less than 8 and longer than 15 characters";

	int USER_PASSWORD_MIN = 8, USER_PASSWORD_MAX = 20;
    String USER_PASSWORD_NULL = "User password (string) cannot be null or empty";
    String USER_PASSWORD_SIZE = "User password cannot be less than 8 and longer than 20 characters";

	int USER_PRIVILEGES_MAX = 20;
    String USER_PRIVILEGES_NULL = "User privileges (string) cannot be null or empty";
    String USER_PRIVILEGES_SIZE = "User privileges cannot be longer than 20 characters";
    
    int USER_ADDRESS_MAX = 100;
    String USER_ADDRESS_NULL = "User address (string) cannot be null or empty";
    String USER_ADDRESS_SIZE = "User address cannot be longer than 100 characters";
}
