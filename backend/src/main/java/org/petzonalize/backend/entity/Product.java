package org.petzonalize.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Entity(name="products")
public class Product {
	private final String notNull = "cannot be null or empty";
	
    @Id
	@Column(name = "product_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

	@NotNull
	@Size(max = 200, message = "Product name cannot be longer than 200 characters")
	@NotBlank(message = "Product name (string)" + notNull)
    private String name;

	@Size(max = 1000, message = "Product description cannot be longer than 1000 characters")
	@Column(nullable = true)
    private String description;

	@NotNull
	@Size(max = 20, message = "Product category cannot be longer than 20 characters")
	@NotBlank(message = "Product category (string)" + notNull)
    private String category;

	@NotNull(message = "Product customizable (boolean)" + notNull)
    private boolean customizable;
	
	@Column(nullable = true)
    private Double price;

	@NotNull
	@Size(max = 150, message = "Product image url cannot be longer than 150 characters")
	@Column(name = "img_url")
	@NotBlank(message = "Product image url (string)" + notNull)
    private String imgUrl;

	@Column(nullable = true)
    private Integer stock;

	@Size(max = 20, message = "Product type cannot be longer than 20 characters")
	@Column(nullable = true)
    private String type;

    @ManyToOne
    @JoinColumn(name = "product_property_id", nullable = true)
    private ProductProperty properties;
}