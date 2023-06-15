package org.petzonalize.backend.mapper;

import org.petzonalize.backend.entity.Product;
import org.petzonalize.backend.entity.ProductProperty;

public abstract class ProductPropertyMapper {
	public static ProductProperty mapToProductProperty(Product product) {
		ProductProperty productProperty = product.getProperties();
		return ProductProperty.builder()
			.id(null)
			.color(productProperty.getColor())
			.size(productProperty.getSize())
			.pattern(productProperty.getPattern())
			.material(productProperty.getMaterial())
			.petname(productProperty.getPetname())
			.petphone(productProperty.getPetphone())
			.shape(productProperty.getShape())
			.body(productProperty.getBody())
			.head(productProperty.getHead())
			.build();
	}
}
