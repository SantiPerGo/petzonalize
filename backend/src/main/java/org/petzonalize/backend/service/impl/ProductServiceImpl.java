package org.petzonalize.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.petzonalize.backend.entity.Product;
import org.petzonalize.backend.mapper.ProductMapper;
import org.petzonalize.backend.repository.ProductRepository;
import org.petzonalize.backend.service.ProductService;
import org.petzonalize.backend.utils.FirebaseUtils;
import org.petzonalize.backend.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service("productService")
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    
	@Override
	public ResponseEntity<?> createProduct(Product product, MultipartFile image) {
		Optional<Product> optionalProduct = productRepository.findByName(product.getName());

		if(optionalProduct.isPresent())
			return ResponseUtils.mapToJsonResponse(
				"User with name '" + product.getName() + "' already exists",
            	HttpStatus.CONFLICT);
		else {
			String imgUrl = FirebaseUtils.uploadFileToFirebaseStorage(image);
			
			if(imgUrl != null) {
				product.setId(optionalProduct.get().getId());
				product.setImgUrl(imgUrl);
	            return new ResponseEntity<>(
	                productRepository.saveAndFlush(ProductMapper.mapToProduct(product)),
	                HttpStatus.CREATED);
			} else
				return ResponseUtils.mapToJsonResponse(
	        		"Product img couldn't be uploaded to Firebase Storage!",
	        		HttpStatus.INTERNAL_SERVER_ERROR); 
		}
	}

	// TODO: delete image from firebase
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
	public ResponseEntity<?> updateProduct(Product product, MultipartFile image) {
        Optional<Product> optionalProduct = productRepository.findById(product.getId());

        if(!optionalProduct.isPresent())
			return ResponseUtils.mapToJsonResponse(
				"Product with id '" + product.getId() + "' doesn't exist", HttpStatus.NOT_FOUND); 
		else {
			if(image != null) {
				String imgUrl = FirebaseUtils.uploadFileToFirebaseStorage(image);
				
				if(imgUrl != null) {
					product.setId(optionalProduct.get().getId());
					product.setImgUrl(imgUrl);
		            return new ResponseEntity<>(
		                productRepository.saveAndFlush(product), HttpStatus.CREATED);
				} else
					return ResponseUtils.mapToJsonResponse(
		        		"Product img couldn't be uploaded to Firebase Storage!",
		        		HttpStatus.INTERNAL_SERVER_ERROR); 
			} else {
				// Getting images urls from firebase
		        List<String> imageUrls = FirebaseUtils.getImagesFromFirebaseStorage();
		        
		        String imgUrl = FirebaseUtils.getImageUrlByName(imageUrls, 
			        FirebaseUtils.getImageNameFromPath(product.getImgUrl()));
		        
		        if(imgUrl == null)
					return ResponseUtils.mapToJsonResponse(
		        		"Provided url doesn't exist in Firebase Storage!",
		        		HttpStatus.BAD_REQUEST); 
	        	else
					return new ResponseEntity<>(
						productRepository.saveAndFlush(product), HttpStatus.CREATED);
			}
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
