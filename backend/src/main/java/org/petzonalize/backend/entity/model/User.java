package org.petzonalize.backend.entity.model;

import org.petzonalize.backend.entity.messages.UserMessages;

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
public class User implements UserMessages {	
	@Id
	@Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

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

	@NotNull(message = USER_PASSWORD_NULL)
	@Size(min = USER_PASSWORD_MIN, max = USER_PASSWORD_MAX,
		message = USER_PASSWORD_SIZE)
	@NotBlank(message = USER_PASSWORD_NULL)
    private String password;

	@ManyToOne
    @JoinColumn(name = "privilege_id")
    private Privilege privileges;
}
