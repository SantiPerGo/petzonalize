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
	private static final String notNull = "(string) cannot be null or empty";
	
	@Id
	@Column(name = "size_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotNull
	@NotBlank(message = "Size category " + notNull)
	@Size(max = 20, message = "Product size category cannot be longer than 20 characters")
    private String category;

	@NotNull
	@NotBlank(message = "Size small " + notNull)
	@Size(max = 100, message = "Product size small cannot be longer than 100 characters")
    private String small;

	@NotNull
	@NotBlank(message = "Size medium " + notNull)
	@Size(max = 100, message = "Product size medium cannot be longer than 100 characters")
    private String medium;

	@NotNull
	@NotBlank(message = "Size big " + notNull)
	@Size(max = 100, message = "Product size big cannot be longer than 100 characters")
    private String big;
}
