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
@Entity(name="customizables")
public class Customizable {
    @Id
	@Column(name = "customizable_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

	@NotNull
	@Size(max = 200)
	@NotBlank(message = "Customizable name string is obligatory")
    private String name;

	@NotNull
	@Size(max = 20)
	@NotBlank(message = "Customizable category string is obligatory")
    private String category;

	@NotNull
	@Size(max = 20)
	@NotBlank(message = "Customizable type string is obligatory")
    private String type;

	@NotNull(message = "Customizable price double is obligatory")
    private double price;

	@NotNull
	@Size(max = 150)
	@Column(name = "img_url")
	@NotBlank(message = "Customizable image url string is obligatory")
    private String imgUrl;

	@Column(nullable = true)
    private Integer stock;

    @ManyToOne
    @JoinColumn(name = "css_property_id", nullable = true)
    private CssProperty cssProperty;
}
