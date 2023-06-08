package org.petzonalize.backend.entity.model;

import org.petzonalize.backend.entity.messages.ProductSizeMessages;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// TODO: Complete swagger documentation
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="sizes")
public class ProductSize implements ProductSizeMessages {
	// TODO: Verify DB not to store variable
	//@Transient
	//@JsonIgnore
	//private static final String notNull = "(string) cannot be null or empty";
	
	@Id
	@Column(name = "size_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotNull(message = SIZE_CATEGORY_NULL)
	@NotBlank(message = SIZE_CATEGORY_NULL)
	@Size(max = PRODUCT_SIZE_CATEGORY_MAX, message = PRODUCT_SIZE_CATEGORY_LENGTH)
    private String category;

	@NotNull(message = PRODUCT_SIZE_SMALL_NULL)
	@NotBlank(message = PRODUCT_SIZE_SMALL_NULL)
	@Size(max = PRODUCT_SIZE_LENGTH, message = PRODUCT_SIZE_SMALL_LENGTH)
    private String small;

	@NotNull(message = PRODUCT_SIZE_MEDIUM_NULL)
	@NotBlank(message = PRODUCT_SIZE_MEDIUM_NULL)
	@Size(max = PRODUCT_SIZE_LENGTH, message = PRODUCT_SIZE_MEDIUM_LENGTH)
    private String medium;

	@NotNull(message = PRODUCT_SIZE_BIG_NULL)
	@NotBlank(message = PRODUCT_SIZE_BIG_NULL)
	@Size(max = PRODUCT_SIZE_LENGTH, message = PRODUCT_SIZE_BIG_LENGTH)
    private String big;
}

