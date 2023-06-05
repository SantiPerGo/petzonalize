package org.petzonalize.backend.service;

import org.springframework.http.ResponseEntity;

public interface ProductService {
    ResponseEntity<?> getProducts();
}
