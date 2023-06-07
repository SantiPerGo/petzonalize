package org.petzonalize.backend.custom_class;

import java.util.List;

import org.petzonalize.backend.entity.Product;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BuyProductsWrapper {
	private UserOrderData user;
	private List<Product> products;
}
