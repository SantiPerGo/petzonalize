package org.petzonalize.backend.mapper;

import java.util.List;

import org.petzonalize.backend.entity.Product;

public abstract class ProductMapper {
	public static Product mapToProduct(Product product) {
        return Product.builder()
        	.id(0L)
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
	
	public static String getProductUrlByName(List<Product> products, String imageName) {
	    for (Product product : products) 
	        if (product.getImgUrl().contains(imageName))
	            return product.getImgUrl();

	    return null;
	}
}
