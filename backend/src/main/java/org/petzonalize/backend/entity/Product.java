package org.petzonalize.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Entity(name="products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

	@NotNull
	@Size(max = 200)
	@NotBlank(message = "Name is obligatory")
    private String name;

	@Size(max = 1000)
    private String description;

	@NotNull
	@Size(max = 20)
	@NotBlank(message = "Category is obligatory")
    private String category;

	@NotNull(message = "Customizable is obligatory")
    private boolean customizable;

    private double price;

	@NotNull
	@Size(max = 150)
	@NotBlank(message = "Image url is obligatory")
    private String imgUrl;

    private int stock;

	@Size(max = 20)
    private String type;

    @ManyToOne
    @JoinColumn(name = "product_property_id")
    private ProductProperty productProperty;
}