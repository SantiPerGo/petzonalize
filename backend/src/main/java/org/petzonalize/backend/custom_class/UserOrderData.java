package org.petzonalize.backend.custom_class;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserOrderData {
	private final String notNull = "(string) cannot be null or empty";
	
	@NotNull
	@Size(max = 50, message = "Username cannot be longer than 50 characters")
	@NotBlank(message = "Username " + notNull)
    private String name;

	@Email
	@NotNull
	@Size(max = 50, message = "User email cannot be longer than 50 characters")
	@NotBlank(message = "User email" + notNull)
    private String email;

	@NotNull
	@Size(min = 8, max = 15,
		message = "User phone cannot be less than 8 or longer than 20 characters")
	@NotBlank(message = "User phone" + notNull)
    private String phone;

	@NotNull
	@Size(max = 100, message = "User address cannot be longer than 100 characters")
	@NotBlank(message = "User address" + notNull)
    private String address;
}
