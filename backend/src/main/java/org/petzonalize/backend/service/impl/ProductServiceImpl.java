package org.petzonalize.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.petzonalize.backend.entity.Product;
import org.petzonalize.backend.mapper.ProductMapper;
import org.petzonalize.backend.repository.ProductRepository;
import org.petzonalize.backend.service.ProductService;
import org.petzonalize.backend.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service("productService")
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    
    // TODO: Allow to send and receive images
	@Override
	public ResponseEntity<?> createProduct(Product product) {
		Optional<Product> optionalProduct = productRepository.findByName(product.getName());
		
		if(optionalProduct.isPresent())
			return ResponseUtils.mapToJsonResponse(
        		"Product with name '" + product.getName() + "' already exists",
        		HttpStatus.CONFLICT); 
		else
            return new ResponseEntity<>(
                productRepository.saveAndFlush(
                	ProductMapper.mapToProduct(product)
        		), HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<?> deleteProduct(Long id){
		Optional<Product> optionalProduct = productRepository.findById(id);
		
		if(!optionalProduct.isPresent())
			return ResponseUtils.mapToJsonResponse(
        		"Product with id '" + id + "' doesn't exist", HttpStatus.NOT_FOUND); 
		else {
	        productRepository.deleteById(id);
			return ResponseUtils.mapToJsonResponse(
        		"Product with id '" + id + "' successfully removed!", HttpStatus.OK); 
		}
	}

	@Override
	public ResponseEntity<?> updateProduct(Product product) {
        Optional<Product> optionalProduct = productRepository.findById(product.getId());
		
		if(!optionalProduct.isPresent())
			return ResponseUtils.mapToJsonResponse(
				"Product with id '" + product.getId() + "' doesn't exist", HttpStatus.NOT_FOUND); 
		else {
            product.setId(optionalProduct.get().getId());
            return new ResponseEntity<>(productRepository.saveAndFlush(product), HttpStatus.OK);
		}
	}

	@Override
	public ResponseEntity<?> getProducts() {
        List<Product> productsList = productRepository.findAll();
		
        if(productsList.size() == 0)
			return ResponseUtils.mapToJsonResponse(
        		"There are no products to send as an answer", HttpStatus.NOT_FOUND); 
        else
        	return new ResponseEntity<>(productsList, HttpStatus.OK);
	}
}
