package org.petzonalize.backend.service;

import org.springframework.http.ResponseEntity;

public interface ProductSizeService {
    /**
     * Retrieves all product sizes.
     * @return Response entity with a list of product sizes or an error message
     */
    ResponseEntity<?> getSizes();
}
