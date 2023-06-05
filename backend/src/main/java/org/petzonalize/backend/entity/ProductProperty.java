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
	@Size(max = 50)
    private String color;

	@Column(nullable = true)
	@Size(max = 50)
    private String size;

	@Column(nullable = true)
	@Size(max = 20)
	private String pattern;

	@Column(nullable = true)
	@Size(max = 20)
	private String material;

	@Column(nullable = true)
	@Size(max = 100)
	private String petname;

	@Column(nullable = true)
	@Size(min = 8, max = 15)
	private String petphone;

	@Column(nullable = true)
	@Size(max = 20)
	private String shape;

	@Column(nullable = true)
	@Size(max = 50)
	private String body;

	@Column(nullable = true)
	@Size(max = 50)
	private String head;
}
