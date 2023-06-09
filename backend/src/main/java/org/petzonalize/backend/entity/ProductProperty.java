package org.petzonalize.backend.entity;

import org.petzonalize.backend.entity.messages.ProductPropertyMessages;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="product_properties")
public class ProductProperty implements ProductPropertyMessages {
    @Id
	@Column(name = "product_property_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@Column(nullable = true)
	@Size(max = PRODUCT_COLOR_MAX, message = PRODUCT_COLOR_MESSAGE)
    private String color;

	@Column(nullable = true)
	@Size(max = PRODUCT_SIZE_MAX, message = PRODUCT_SIZE_MESSAGE)
    private String size;

	@Column(nullable = true)
	@Size(max = PRODUCT_PATTERN_MAX, message = PRODUCT_PATTERN_MESSAGE)
	private String pattern;

	@Column(nullable = true)
	@Size(max = PRODUCT_MATERIAL_MAX, message = PRODUCT_MATERIAL_MESSAGE)
	private String material;

	@Column(nullable = true)
	@Size(max = PRODUCT_PETNAME_MAX, message = PRODUCT_PETNAME_MESSAGE)
	private String petname;

	@Column(nullable = true)
	@Size(min = PRODUCT_PETPHONE_MIN, max = PRODUCT_PETPHONE_MAX,
		message = PRODUCT_PETPHONE_MESSAGE)
	private String petphone;

	@Column(nullable = true)
	@Size(max = PRODUCT_SHAPE_MAX, message = PRODUCT_SHAPE_MESSAGE)
	private String shape;

	@Column(nullable = true)
	@Size(max = PRODUCT_BODY_MAX, message = PRODUCT_BODY_MESSAGE)
	private String body;

	@Column(nullable = true)
	@Size(max = PRODUCT_HEAD_MAX, message = PRODUCT_HEAD_MESSAGE)
	private String head;
}
