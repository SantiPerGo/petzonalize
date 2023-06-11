package org.petzonalize.backend.mapper;

import org.petzonalize.backend.entity.Order;
import org.petzonalize.backend.entity.OrderHasProduct;
import org.petzonalize.backend.entity.Product;

public abstract class OrderHasProductMapper {
	public static OrderHasProduct mapToOrderHasProduct(Order order, Product product) {
		return OrderHasProduct.builder()
			.id(0L)
			.order(order)
			.product(product)
			.build();
	}
}
