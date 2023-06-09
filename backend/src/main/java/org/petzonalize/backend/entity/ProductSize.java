package org.petzonalize.backend.entity;

import org.petzonalize.backend.constant.ProductSizeConstants;

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

// TODO: Complete swagger documentation
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="sizes")
public class ProductSize implements ProductSizeConstants {	
	@Id
	@Column(name = "size_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull(message = PRODUCT_SIZE_CATEGORY_NULL)
	@NotBlank(message = PRODUCT_SIZE_CATEGORY_NULL)
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

