package org.petzonalize.backend.custom_class;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginRequest {
	@JsonIgnore
	private static final String notNull = "(string) cannot be null or empty";
	
	@Email
	@NotNull
	@Size(max = 50, message = "User email cannot be longer than 50 characters")
	@NotBlank(message = "User email" + notNull)
    private String email;
	
	@NotNull
	@Size(min = 8, max = 20,
		message = "User password cannot be less than 8 or longer than 20 characters")
	@NotBlank(message = "User password" + notNull)
    private String password;
}
