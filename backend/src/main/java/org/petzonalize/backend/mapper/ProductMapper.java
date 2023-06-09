package org.petzonalize.backend.mapper;

import org.petzonalize.backend.entity.Product;

public abstract class ProductMapper {
	public static Product mapToProduct(Product product) {
        return Product.builder()
            .name(product.getName())
            .description(product.getDescription())
            .category(product.getCategory())
            .customizable(product.isCustomizable())
            .price(product.getPrice())
            .imgUrl(product.getImgUrl())
            .stock(product.getStock())
            .type(product.getType())
            .properties(product.getProperties())
            .build();
	}
}
