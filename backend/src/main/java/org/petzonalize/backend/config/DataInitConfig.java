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
	
    @Autowired
    private FirebaseUtils firebaseUtils;
	
	@Override
	public void run(String... args) throws Exception {
		// Getting images urls from firebase
        List<String> imageUrls = firebaseUtils.getImagesFromFirebaseStorage();
        List<Product> products = productRepository.findAll();
		
		// Updating images urls        
        products.forEach(product -> {
	        product.setImgUrl(firebaseUtils.getImageUrlByName(imageUrls, 
	        	firebaseUtils.getImageNameFromPath(product.getImgUrl()))
    		);
        });
        productRepository.saveAllAndFlush(products);
	}
}
