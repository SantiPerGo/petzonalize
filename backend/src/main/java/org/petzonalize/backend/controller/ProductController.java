package org.petzonalize.backend.controller;

import org.petzonalize.backend.entity.Product;
import org.petzonalize.backend.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins="*")
public class ProductController {
	@Autowired
	private ProductService productService;
	
    @GetMapping
    public ResponseEntity<?> getProducts() {
    	return productService.getProducts();
    }
	
    @PostMapping
	public ResponseEntity<?> createProduct(@RequestPart("product") Product product,
            @RequestPart("image") MultipartFile image) {
    	return productService.createProduct(product, image);
	}
    
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        return productService.deleteProduct(id);
    }
    
    @PutMapping
    public ResponseEntity<?> updateProduct(@RequestBody Product product){
        return productService.updateProduct(product);
    }
}
