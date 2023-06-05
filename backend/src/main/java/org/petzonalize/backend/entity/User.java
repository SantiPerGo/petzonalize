package org.petzonalize.backend.entity;

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
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotNull
	@Size(max = 50)
	@NotBlank(message = "Name is obligatory")
    private String name;

	@Email
	@NotNull
	@Size(max = 50)
	@NotBlank(message = "Email is obligatory")
    private String email;

	@NotNull
	@Size(min = 10, max = 10)
	@NotBlank(message = "Phone is obligatory")
    private String phone;

	@NotNull
	@Size(min = 8, max = 20)
	@NotBlank(message = "Password is obligatory")
    private String password;

	@NotNull
	@Size(max = 20)
	@NotBlank(message = "Privileges is obligatory")
    private String privileges;
}
