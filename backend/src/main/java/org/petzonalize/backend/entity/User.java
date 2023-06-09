package org.petzonalize.backend.entity;

import org.petzonalize.backend.constant.UserConstants;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="users")
public class User implements UserConstants {	
	@Id
	@Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull(message = USERNAME_NULL)
	@Size(max = USERNAME_MAX, message = USERNAME_SIZE)
	@NotBlank(message = USERNAME_NULL)
    private String name;

	@Email
	@NotNull(message = USER_EMAIL_NULL)
	@Size(max = USER_EMAIL_MAX, message = USER_EMAIL_SIZE)
	@NotBlank(message = USER_EMAIL_NULL)
    private String email;

	@NotNull(message = USER_PHONE_NULL)
	@Size(min = USER_PHONE_MIN, max = USER_PHONE_MAX,
		message = USER_PHONE_SIZE)
	@NotBlank(message = USER_PHONE_NULL)
    private String phone;

	@Size(min = USER_PASSWORD_MIN, max = USER_PASSWORD_MAX,
		message = USER_PASSWORD_SIZE)
	@Column(nullable = true)
    private String password;
	
    @NotNull(message = USER_ADDRESS_NULL)
    @Size(max = USER_ADDRESS_MAX, message = USER_ADDRESS_SIZE)
    @NotBlank(message = USER_ADDRESS_NULL)
    private String address;

	@ManyToOne
    @JoinColumn(name = "privilege_id", nullable = true)
    private Privilege privileges;
}
