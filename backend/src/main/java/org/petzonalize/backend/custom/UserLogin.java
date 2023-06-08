package org.petzonalize.backend.custom;

import org.petzonalize.backend.entity.messages.UserMessages;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserLogin implements UserMessages {
	@JsonIgnore
	private static final String notNull = "(string) cannot be null or empty";
	
	@Email
	@NotNull
	@Size(max = USER_EMAIL_MAX, message = USER_EMAIL_SIZE)
	@NotBlank(message = USER_EMAIL_NULL)
    private String email;
	
	@NotNull
	@Size(min = USER_PASSWORD_MIN, max = USER_PASSWORD_MAX,
		message = USER_PASSWORD_SIZE)
	@NotBlank(message = USER_PASSWORD_NULL)
    private String password;
}
