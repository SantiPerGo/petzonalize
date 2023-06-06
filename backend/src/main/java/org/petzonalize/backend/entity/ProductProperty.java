package org.petzonalize.backend.entity;

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
public class ProductProperty {
    @Id
	@Column(name = "product_property_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

	@Column(nullable = true)
	@Size(max = 50, message = "Product property color cannot be longer than 50 characters")
    private String color;

	@Column(nullable = true)
	@Size(max = 50, message = "Product property size cannot be longer than 50 characters")
    private String size;

	@Column(nullable = true)
	@Size(max = 20, message = "Product property pattern cannot be longer than 20 characters")
	private String pattern;

	@Column(nullable = true)
	@Size(max = 20, message = "Product property material cannot be longer than 20 characters")
	private String material;

	@Column(nullable = true)
	@Size(max = 100, message = "Product property petname cannot be longer than 100 characters")
	private String petname;

	@Column(nullable = true)
	@Size(min = 8, max = 15,
		message = "Product property petphone cannot be less than 8 or longer than 20 characters")
	private String petphone;

	@Column(nullable = true)
	@Size(max = 20, message = "Product property shape cannot be longer than 20 characters")
	private String shape;

	@Column(nullable = true)
	@Size(max = 50, message = "Product property body cannot be longer than 50 characters")
	private String body;

	@Column(nullable = true)
	@Size(max = 50, message = "Product property head cannot be longer than 50 characters")
	private String head;
}
