package org.petzonalize.backend.service;

import java.util.List;

import org.petzonalize.backend.entity.Product;
import org.springframework.http.ResponseEntity;

public interface ProductService {
    ResponseEntity<?> getProducts();
	ResponseEntity<?> createProduct(Product product);
	ResponseEntity<String> deleteProduct(int id);
	ResponseEntity<?> updateProduct(Product product);
	ResponseEntity<?> buyProducts(List<Product> products);
}
