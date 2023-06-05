package org.petzonalize.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Entity(name="sizes")
public class Size {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

    private String category;

    private String small;

    private String medium;

    private String big;
}
