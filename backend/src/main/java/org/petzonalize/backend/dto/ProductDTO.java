package org.petzonalize.backend.dto;

import org.petzonalize.backend.constant.ProductConstants;
import org.petzonalize.backend.entity.ProductProperty;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class ProductDTO implements ProductConstants {	
    @Id
	@Column(name = "product_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@NotNull(message = PRODUCT_NAME_NULL)
	@Size(max = PRODUCT_NAME_MAX, message = PRODUCT_NAME_SIZE)
	@NotBlank(message = PRODUCT_NAME_NULL)
    private String name;

	@Column(nullable = true)
	@Size(max = PRODUCT_DESC_MAX, message = PRODUCT_DESC_SIZE)
    private String description;

	@NotNull(message = PRODUCT_CATEGORY_NULL)
	@Size(max = PRODUCT_CATEGORY_MAX, message = PRODUCT_CATEGORY_SIZE)
	@NotBlank(message = PRODUCT_CATEGORY_NULL)
    private String category;

	@NotNull(message = PRODUCT_CUSTOM_NULL)
    private boolean customizable;
	
	@Column(nullable = true)
    private Double price;

	@Column(name = "img_url")
	@NotNull(message = PRODUCT_IMG_NULL)
	@Size(max = PRODUCT_IMG_MAX, message = PRODUCT_IMG_SIZE)
	@NotBlank(message = PRODUCT_IMG_NULL)
    private String imgUrl;

	@NotNull(message = PRODUCT_AMOUNT_NULL)
    private Integer amount;

	@Column(nullable = true)
	@Size(max = PRODUCT_TYPE_MAX, message = PRODUCT_TYPE_SIZE)
    private String type;

    @ManyToOne
    @JoinColumn(name = "product_property_id", nullable = true)
    private ProductProperty properties;

}
