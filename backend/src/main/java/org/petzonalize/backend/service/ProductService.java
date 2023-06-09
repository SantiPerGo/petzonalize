package org.petzonalize.backend.service;

import org.petzonalize.backend.entity.Product;
import org.springframework.http.ResponseEntity;

public interface ProductService {
    ResponseEntity<?> getProducts();
	ResponseEntity<?> createProduct(Product product);
	ResponseEntity<String> deleteProduct(Long id);
	ResponseEntity<?> updateProduct(Product product);
}
