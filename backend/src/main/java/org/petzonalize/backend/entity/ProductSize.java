package org.petzonalize.backend.entity;

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
@Entity(name="sizes")
public class ProductSize {
	@Id
	@Column(name = "size_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotNull
	@NotBlank(message = "Size category string is obligatory")
	@Size(max = 20)
    private String category;

	@NotNull
	@NotBlank(message = "Size small string is obligatory")
	@Size(max = 100)
    private String small;

	@NotNull
	@NotBlank(message = "Size medium string is obligatory")
	@Size(max = 100)
    private String medium;

	@NotNull
	@NotBlank(message = "Size big string is obligatory")
	@Size(max = 100)
    private String big;
}
