package org.petzonalize.backend.entity;

import org.petzonalize.backend.constant.CustomizableConstants;

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
public class Customizable implements CustomizableConstants {	
    @Id
	@Column(name = "customizable_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@NotNull(message = CUSTOMIZABLE_NAME_NULL)
	@Size(max = CUSTOMIZABLE_NAME_MAX,
		message =CUSTOMIZABLE_NAME_SIZE)
	@NotBlank(message = CUSTOMIZABLE_NAME_NULL)
    private String name;

	@NotNull(message = CUSTOMIZABLE_CATEGORY_NULL)
	@Size(max = CUSTOMIZABLE_CATEGORY_MAX,
		message = CUSTOMIZABLE_CATEGORY_SIZE)
	@NotBlank(message = CUSTOMIZABLE_CATEGORY_NULL)
    private String category;

	@NotNull(message = CUSTOMIZABLE_TYPE_NULL)
	@Size(max = CUSTOMIZABLE_TYPE_MAX, message = CUSTOMIZABLE_TYPE_SIZE)
	@NotBlank(message = CUSTOMIZABLE_TYPE_NULL)
    private String type;

	@NotNull(message = CUSTOMIZABLE_PRICE_NULL)
    private double price;

	@NotNull(message = CUSTOMIZABLE_IMG_NULL)
	@Size(max = CUSTOMIZABLE_IMG_MAX,
		message = CUSTOMIZABLE_IMG_SIZE)
	@NotBlank(message = CUSTOMIZABLE_IMG_NULL)
	@Column(name = "img_url")
    private String imgUrl;

	@Column(nullable = true)
    private Integer stock;

    @ManyToOne
    @JoinColumn(name = "css_property_id", nullable = true)
    private CssProperty cssProperties;
}
