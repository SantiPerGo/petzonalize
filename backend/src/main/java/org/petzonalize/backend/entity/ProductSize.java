package org.petzonalize.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Entity(name="sizes")
public class ProductSize {
	@Id
	@Column(name = "size_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotNull
	@Size(max = 20)
    private String category;

	@NotNull
	@Size(max = 100)
    private String small;

	@NotNull
	@Size(max = 100)
    private String medium;

	@NotNull
	@Size(max = 100)
    private String big;
}
