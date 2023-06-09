package org.petzonalize.backend.entity;

import org.petzonalize.backend.entity.messages.CssPropertyMessages;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Entity(name="css_properties")
public class CssProperty implements CssPropertyMessages {	
    @Id
	@Column(name = "css_property_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@NotNull(message = CSS_DOG_TOP_NULL)
	@Size(min = CSS_DOG_TOP_MIN, max = CSS_DOG_TOP_MAX,
		message = CSS_DOG_TOP_SIZE)
	@NotBlank(message = CSS_DOG_TOP_NULL)
	@Column(name = "dog_top")
    private String dogTop;

	@NotNull(message = CSS_DOG_RIGHT_NULL)
	@Size(min = CSS_DOG_RIGHT_MIN, max = CSS_DOG_RIGHT_MAX,
		message = CSS_DOG_RIGHT_SIZE)
	@NotBlank(message = CSS_DOG_RIGHT_NULL)
	@Column(name = "dog_right")
    private String dogRight;

	@NotNull(message = CSS_CAT_TOP_NULL)
	@Size(min = CSS_CAT_TOP_MIN, max = CSS_CAT_TOP_MAX,
		message = CSS_CAT_TOP_SIZE)
	@NotBlank(message = CSS_CAT_TOP_NULL)
	@Column(name = "cat_top")
    private String catTop;

	@NotNull(message = CSS_CAT_RIGHT_NULL)
	@Size(min = CSS_CAT_RIGHT_MIN, max = CSS_CAT_RIGHT_MAX,
		message = CSS_CAT_RIGHT_SIZE)
	@NotBlank(message = CSS_CAT_RIGHT_NULL)
	@Column(name = "cat_right")
    private String catRight;
}
