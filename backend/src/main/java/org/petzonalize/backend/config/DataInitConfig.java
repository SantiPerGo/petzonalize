package org.petzonalize.backend.config;

import java.util.List;

import org.petzonalize.backend.entity.Product;
import org.petzonalize.backend.repository.ProductRepository;
import org.petzonalize.backend.utils.FirebaseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitConfig implements CommandLineRunner {
	@Autowired
	private ProductRepository productRepository;
	
	@Override
	public void run(String... args) throws Exception {
		// Getting images urls from firebase
        List<String> imageUrls = FirebaseUtils.getImagesFromFirebaseStorage();
        List<Product> products = productRepository.findAll();
		
		// Updating images urls        
        products.forEach(product -> {
	        product.setImgUrl(FirebaseUtils.getImageUrlByName(imageUrls, 
	        	FirebaseUtils.getImageNameFromPath(product.getImgUrl()))
    		);
        });
        productRepository.saveAllAndFlush(products);
	}
}
