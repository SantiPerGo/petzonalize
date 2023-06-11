package org.petzonalize.backend.service;

import org.petzonalize.backend.entity.Product;
import org.springframework.http.ResponseEntity;

public interface ProductService {
    /**
     * Retrieves all products.
     * @return Response entity with a list of products or an error message
     */
    ResponseEntity<?> getProducts();

    /**
     * Creates a new product.
     * @param product The product to be created
     * @return Response entity with the created product or an error message
     */
    ResponseEntity<?> createProduct(Product product);

    /**
     * Deletes a product by its ID.
     * @param id The ID of the product to be deleted
     * @return Response entity with a success message or an error message
     */
    ResponseEntity<?> deleteProduct(Long id);

    /**
     * Updates an existing product.
     * @param product The product to be updated
     * @return Response entity with the updated product or an error message
     */
    ResponseEntity<?> updateProduct(Product product);
}
