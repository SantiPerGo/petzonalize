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
    @Id
	@Column(name = "product_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

	@NotNull
	@Size(max = 200)
	@NotBlank(message = "Product name string is obligatory")
    private String name;

	@Size(max = 1000)
	@Column(nullable = true)
    private String description;

	@NotNull
	@Size(max = 20)
	@NotBlank(message = "Product category string is obligatory")
    private String category;

	@NotNull(message = "Product customizable boolean is obligatory")
    private boolean customizable;
	
	@Column(nullable = true)
    private Double price;

	@NotNull
	@Size(max = 150)
	@Column(name = "img_url")
	@NotBlank(message = "Product image url string is obligatory")
    private String imgUrl;

	@Column(nullable = true)
    private Integer stock;

	@Size(max = 20)
	@Column(nullable = true)
    private String type;

    @ManyToOne
    @JoinColumn(name = "product_property_id", nullable = true)
    private ProductProperty productProperty;
}