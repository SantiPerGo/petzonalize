package org.petzonalize.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="users")
public class User {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

    private String name;

    private String email;

    private String phone;

    private String password;

    private String privileges;
}
