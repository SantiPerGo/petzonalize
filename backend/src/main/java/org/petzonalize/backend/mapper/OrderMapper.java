package org.petzonalize.backend.mapper;

import org.petzonalize.backend.entity.Order;
import org.petzonalize.backend.entity.User;

public abstract class OrderMapper {
	public static Order mapToOrder(User user) {
		return Order.builder()
			.id(null)
			.user(user)
			.build();
	}
}
