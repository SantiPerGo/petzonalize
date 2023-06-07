package org.petzonalize.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.petzonalize.backend.entity.Product;
import org.petzonalize.backend.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins="*")
public class ProductController {
	@Autowired
	private ProductService productService;
	
	@ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<String> handleNotReadableEx(HttpMessageNotReadableException ex) {
        return new ResponseEntity<>("Error: " + ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
	
	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<ArrayList<String>> handleViolationEx(ConstraintViolationException ex)  {
		ArrayList<String> exceptionsList = new ArrayList<>();
    	
    	for(ConstraintViolation<?> violation: ex.getConstraintViolations())
    		exceptionsList.add("error-" + violation.getPropertyPath()
    			+ ": " + violation.getMessage());
    	
        return new ResponseEntity<>(exceptionsList, HttpStatus.BAD_REQUEST);
	}
		
    @GetMapping
    public ResponseEntity<?> getProducts() {
    	return productService.getProducts();
    }
	
    @PostMapping
	public ResponseEntity<?> createProduct(@RequestBody final Product product) {
    	return productService.createProduct(product);
	}
    
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        return productService.deleteProduct(id);
    }
    
    @PutMapping
    public ResponseEntity<?> updateProduct(@RequestBody Product product){
        return productService.updateProduct(product);
    }
	
    @PutMapping("/buy")
	public ResponseEntity<?> buyProducts(@RequestBody List<Product> products) {
    	return productService.buyProducts(products);
	}
}
