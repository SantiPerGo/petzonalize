package org.petzonalize.backend.service;

import java.util.List;

import org.petzonalize.backend.dto.ProductDTO;
import org.petzonalize.backend.entity.User;
import org.springframework.http.ResponseEntity;

public interface OrderService {
	ResponseEntity<?> orderProducts(User user, List<ProductDTO> products);
}
