package org.petzonalize.backend.service;

import java.util.List;

import org.petzonalize.backend.dto.ProductDTO;
import org.petzonalize.backend.entity.User;
import org.springframework.http.ResponseEntity;

public interface OrderService {
    /**
     * Places an order for the specified products on behalf of the user.
     * @param user The user placing the order
     * @param products The list of products to be ordered
     * @return Response entity with a success message or an error message
     */
    ResponseEntity<?> orderProducts(User user, List<ProductDTO> products);
}
