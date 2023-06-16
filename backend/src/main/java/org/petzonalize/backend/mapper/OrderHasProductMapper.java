package org.petzonalize.backend.mapper;

import org.petzonalize.backend.entity.Order;
import org.petzonalize.backend.entity.OrderHasProduct;
import org.petzonalize.backend.entity.Product;

public abstract class OrderHasProductMapper {
	public static OrderHasProduct mapToOrderHasProduct(Order order, Product product, int amount) {
		return OrderHasProduct.builder()
			.id(null)
			.order(order)
			.product(product)
			.amount(amount)
			.properties(product.getProperties())
			.build();
	}
}
