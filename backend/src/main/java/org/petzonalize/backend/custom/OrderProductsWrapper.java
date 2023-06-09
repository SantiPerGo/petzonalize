package org.petzonalize.backend.custom;

import java.util.List;

import org.petzonalize.backend.entity.model.User;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderProductsWrapper {
	private User user;
	private List<ProductOrder> products;
}
