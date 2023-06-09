package org.petzonalize.backend.entity;

import org.petzonalize.backend.entity.messages.UserMessages;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="privileges")
public class Privilege implements UserMessages {
	@Id
	@Column(name = "privilege_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	@NotNull(message = USER_PRIVILEGES_NULL)
	@Size(max = USER_PRIVILEGES_MAX, message = USER_PRIVILEGES_SIZE)
	@NotBlank(message = USER_PRIVILEGES_NULL)
    private String privilege;
}
