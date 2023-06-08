package org.petzonalize.backend.service;

import java.util.List;
import java.util.Optional;

import org.petzonalize.backend.custom_class.UserOrderData;
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
	public ResponseEntity<?> createProduct(Product product) {
		Optional<Product> optionalProduct = productRepository.findByName(product.getName());
		
		if(optionalProduct.isPresent())
            return new ResponseEntity<>(
            		"Product with name '" + product.getName() + "' already exists",
            		HttpStatus.CONFLICT);
		else {
            Product newProduct = Product.builder()
                    .name(product.getName())
                    .description(product.getDescription())
                    .category(product.getCategory())
                    .customizable(product.isCustomizable())
                    .price(product.getPrice())
                    .imgUrl(product.getImgUrl())
                    .stock(product.getStock())
                    .type(product.getType())
                    .properties(product.getProperties())
                    .build();

            return new ResponseEntity<>(
                productRepository.saveAndFlush(newProduct), HttpStatus.CREATED);

		}
	}

	// TODO: Delete with email and password
	@Override
	public ResponseEntity<String> deleteProduct(int id){
		Optional<Product> optionalProduct = productRepository.findById(id);
		
		if(!optionalProduct.isPresent())
			return new ResponseEntity<>(
            		"Product with id '" + id + "' doesn't exist", HttpStatus.NOT_FOUND);
		else {
	        productRepository.deleteById(id);
	        return new ResponseEntity<>(
	        		"Product with id '" + id + "' successfully removed!", HttpStatus.OK);
		}
	}

	@Override
	public ResponseEntity<?> updateProduct(Product product) {
        Optional<Product> optionalProduct = productRepository.findById(product.getId());
		
		if(!optionalProduct.isPresent())
			return new ResponseEntity<>(
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
			return new ResponseEntity<>(
            		"There are no products to send as an answer", HttpStatus.NOT_FOUND);
        else
        	return new ResponseEntity<>(productsList, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> buyProducts(UserOrderData user, List<Product> products) {	
		productRepository.saveAllAndFlush(products);
		
		// TODO: Send email with the products to the user
		
		return new ResponseEntity<>("Products updated succesfully!", HttpStatus.OK);
	}
}
