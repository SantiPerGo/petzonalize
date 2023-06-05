package org.petzonalize.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.validation.constraints.Size;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Entity(name="product_properties")
public class ProductProperties {
    @Id
	@Column(name = "product_property_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

	@Size(max = 50)
    private String color;

	@Size(max = 50)
    private String size;

	@Size(max = 20)
	private String pattern;
	
	@Size(max = 20)
	private String material;

	@Size(max = 100)
	private String petname;

	@Size(min = 10, max = 10)
	private String petphone;

	@Size(max = 20)
	private String shape;

	@Size(max = 50)
	private String body;

	@Size(max = 50)
	private String head;
}
