package org.petzonalize.backend.service;

import org.petzonalize.backend.entity.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface ProductService {
    /**
     * Retrieves all products.
     * @return Response entity with a list of products or an error message
     */
    ResponseEntity<?> getProducts();

    /**
     * Creates a new product.
     * @param product The product to be created
     * @param image The image file associated with the product
     * @return ResponseEntity containing the created product or an error message
     */
    ResponseEntity<?> createProduct(Product product, MultipartFile image);

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
