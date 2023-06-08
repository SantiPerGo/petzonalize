package org.petzonalize.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
	@JsonIgnore
	private static final String notNull = "cannot be null or empty";
	
    @Id
	@Column(name = "customizable_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

	@NotNull
	@Size(max = 200,
		message = "Customizable name cannot be longer than 200 characters")
	@NotBlank(message = "Customizable name (string)" + notNull)
    private String name;

	@NotNull
	@Size(max = 20,
		message = "Customizable category cannot be longer than 20 characters")
	@NotBlank(message = "Customizable category (string)" + notNull)
    private String category;

	@NotNull
	@Size(max = 20, message = "Customizable type cannot be longer than 20 characters")
	@NotBlank(message = "Customizable type (string)" + notNull)
    private String type;

	@NotNull(message = "Customizable price (double)" + notNull)
    private double price;

	@NotNull
	@Size(max = 150,
		message = "Customizable image url cannot be longer than 150 characters")
	@Column(name = "img_url")
	@NotBlank(message = "Customizable image url (string)" + notNull)
    private String imgUrl;

	@Column(nullable = true)
    private Integer stock;

    @ManyToOne
    @JoinColumn(name = "css_property_id", nullable = true)
    private CssProperty cssProperties;
}
