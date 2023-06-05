package org.petzonalize.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Entity(name="customizables")
public class Customizable {
    @Id
	@Column(name = "customizable_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String category;

    private String type;

    private double price;

    private String imgUrl;

    private int stock;

    @ManyToOne
    @JoinColumn(name = "css_property_id")
    private CssProperty cssProperties;
}
