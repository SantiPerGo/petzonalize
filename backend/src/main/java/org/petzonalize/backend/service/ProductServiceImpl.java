package org.petzonalize.backend.service;

import java.util.List;

import org.petzonalize.backend.entity.Product;
import org.petzonalize.backend.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service("productService")
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

	@Override
	public ResponseEntity<?> getProducts() {
        List<Product> productsList = productRepository.findAll();
		
        if(productsList.size() == 0)
			return new ResponseEntity<>(
            		"There are no products to send as an answer", HttpStatus.NOT_FOUND);
        else
        	return new ResponseEntity<>(productsList, HttpStatus.OK);
	}
}
