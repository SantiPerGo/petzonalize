package org.petzonalize.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
public class CssProperty {
	@JsonIgnore
	private static final String notNull = "(string) cannot be null or empty";
	@JsonIgnore
	private static final String sizeLimit = "cannot be less than 2 or longer than 10 characters";
	
    @Id
	@Column(name = "css_property_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

	@NotNull
	@Size(min = 2, max = 10,
		message = "Css property dog top " + sizeLimit)
	@NotBlank(message = "Css property dog top " + notNull)
	@Column(name = "dog_top")
    private String dogTop;

	@NotNull
	@Size(min = 2, max = 10,
			message = "Css property dog right " + sizeLimit)
	@NotBlank(message = "Css property dog top " + notNull)
	@Column(name = "dog_right")
    private String dogRight;

	@NotNull
	@Size(min = 2, max = 10,
			message = "Css property cat top " + sizeLimit)
	@NotBlank(message = "Css property dog top " + notNull)
	@Column(name = "cat_top")
    private String catTop;

	@NotNull
	@Size(min = 2, max = 10,
			message = "Css property cat right " + sizeLimit)
	@NotBlank(message = "Css property dog top " + notNull)
	@Column(name = "cat_right")
    private String catRight;
}
