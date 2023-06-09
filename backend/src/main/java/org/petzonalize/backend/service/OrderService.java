package org.petzonalize.backend.service;

import java.util.List;

import org.petzonalize.backend.custom.ProductOrder;
import org.petzonalize.backend.entity.model.User;
import org.springframework.http.ResponseEntity;

public interface OrderService {
	ResponseEntity<?> orderProducts(User user, List<ProductOrder> products);
}
