package org.petzonalize.backend.custom_class;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserNoPassword {
	private final String notNull = "(string) cannot be null or empty";
	
	@Id
	@Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

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
	@Size(max = 20, message = "User privileges cannot be longer than 20 characters")
	@NotBlank(message = "User privileges" + notNull)
    private String privileges;
}
