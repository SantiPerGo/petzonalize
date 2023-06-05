package org.petzonalize.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Entity(name="users")
public class User {
	@Id
	@Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotNull
	@Size(max = 50)
	@NotBlank(message = "User name string is obligatory")
    private String name;

	@Email
	@NotNull
	@Size(max = 50)
	@NotBlank(message = "User email string is obligatory")
    private String email;

	@NotNull
	@Size(min = 10, max = 10)
	@NotBlank(message = "User phone string is obligatory")
    private String phone;

	@NotNull
	@Size(min = 8, max = 20)
	@NotBlank(message = "User password string is obligatory")
    private String password;

	@NotNull
	@Size(max = 20)
	@NotBlank(message = "User privileges string is obligatory")
    private String privileges;
}
