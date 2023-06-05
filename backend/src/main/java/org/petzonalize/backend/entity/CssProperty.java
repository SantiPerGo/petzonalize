package org.petzonalize.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Entity(name="css_properties")
public class CssProperty {
    @Id
	@Column(name = "css_property_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

	@NotNull(message = "Dog top is obligatory")
	@Size(min = 2, max = 10)
	@Column(name = "dog_top")
    private String dogTop;

	@NotNull(message = "Dog right is obligatory")
	@Size(min = 2, max = 10)
	@Column(name = "dog_right")
    private String dogRight;

	@NotNull(message = "Cat top is obligatory")
	@Size(min = 2, max = 10)
	@Column(name = "cat_top")
    private String catTop;

	@NotNull(message = "Cat right is obligatory")
	@Size(min = 2, max = 10)
	@Column(name = "cat_right")
    private String catRight;
}
