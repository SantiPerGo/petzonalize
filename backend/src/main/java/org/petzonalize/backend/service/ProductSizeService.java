package org.petzonalize.backend.service;

import org.springframework.http.ResponseEntity;

public interface ProductSizeService {
    ResponseEntity<?> getSizes();
}
