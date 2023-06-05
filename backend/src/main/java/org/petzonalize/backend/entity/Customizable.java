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
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Entity(name="customizables")
public class Customizable {
    @Id
	@Column(name = "customizable_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

	@NotNull
	@Size(max = 200)
	@NotBlank(message = "Name is obligatory")
    private String name;

	@NotNull
	@Size(max = 20)
	@NotBlank(message = "Category is obligatory")
    private String category;

	@NotNull
	@Size(max = 20)
	@NotBlank(message = "Type is obligatory")
    private String type;

	@NotNull(message = "Price is obligatory")
    private double price;

	@NotNull
	@Size(max = 150)
	@NotBlank(message = "Image url is obligatory")
    private String imgUrl;

    private int stock;

    @ManyToOne
    @JoinColumn(name = "css_property_id")
    private CssProperty cssProperty;
}
