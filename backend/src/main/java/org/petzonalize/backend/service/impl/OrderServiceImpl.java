package org.petzonalize.backend.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.petzonalize.backend.dto.ProductDTO;
import org.petzonalize.backend.entity.Order;
import org.petzonalize.backend.entity.OrderHasProduct;
import org.petzonalize.backend.entity.Product;
import org.petzonalize.backend.entity.User;
import org.petzonalize.backend.repository.OrderHasProductRepository;
import org.petzonalize.backend.repository.OrderRepository;
import org.petzonalize.backend.repository.ProductRepository;
import org.petzonalize.backend.repository.UserRepository;
import org.petzonalize.backend.service.OrderService;
import org.petzonalize.backend.utils.EmailService;
import org.petzonalize.backend.utils.FirebaseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.transaction.Transactional;

@Service("orderService")
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private OrderHasProductRepository orderHasProductRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private FirebaseHandler firebaseHandler;

    @Autowired
    private TemplateEngine templateEngine;
    
    private final EmailService emailService;
    public OrderServiceImpl(EmailService emailService) {
        this.emailService = emailService;
    }
    
    @Transactional
	@Override
	public ResponseEntity<?> orderProducts(User customer, List<ProductDTO> products) {
    	Optional<User> optionalUser = userRepository.findByEmail(customer.getEmail());
		
    	User user;
    	
    	// If user doesn't exist, we have to create it
    	if(optionalUser.isPresent())
    		user = optionalUser.get();
    	else {
    		user = customer;
    		userRepository.saveAndFlush(user);
    	}    	
		
    	Order order = Order.builder()
			.user(user)
			.purchaseDate(new Date())
			.build();
    	
		// Creating order
		orderRepository.saveAndFlush(order);
		
		double total = 0; 
		int totalAmount = 0;
		
		for(ProductDTO productOrder : products) {
			Optional<Product> optionalProduct =
				productRepository.findById(productOrder.getId());
			
			if(optionalProduct.isPresent()) {
				Product product = optionalProduct.get();
				int stock = product.getStock();
				int amount = productOrder.getAmount();
				
				if(stock >= amount) {
					product.setStock(stock - amount);
					
					// Updating product stock
					productRepository.saveAndFlush(product);
					
					// Updating order total cost
					total += (productOrder.getPrice() * amount);
					totalAmount += amount;
					
					OrderHasProduct orderHasProduct = OrderHasProduct.builder()
						.order(order)
						.product(product)
						.build();
					
					// Creating connection between order and product
					orderHasProductRepository.saveAndFlush(orderHasProduct);
				} else {
					return new ResponseEntity<>("Product amount is greater than stock: " +
						productOrder, HttpStatus.BAD_REQUEST);
				}
			} else {
				return new ResponseEntity<>("Product not found: " +
					productOrder, HttpStatus.BAD_REQUEST);
			}
		}

        String subject = "Petzonalize - ¡Gracias por tu Compra!";
    	List<String> imageUrls = firebaseHandler.getImagesFromFirebaseStorage();
        String logoUrl = firebaseHandler.getImageUrlByName(imageUrls, "Logo.png");
        
        // Getting images urls
        products.forEach(product -> {
	        product.setImgUrl(firebaseHandler.getImageUrlByName(imageUrls, 
		        firebaseHandler.getImageNameFromPath(product.getImgUrl()))
    		);
        });
        
        // Loading HTML with Thymeleaf
        Context context = new Context();
        context.setVariable("logoUrl", logoUrl);
        context.setVariable("products", products);
        context.setVariable("total", total);
        context.setVariable("totalAmount", totalAmount);
        String htmlContent = templateEngine.process("order_recipe", context);

		emailService.sendEmail(user.getEmail(), subject, htmlContent);
		
		return new ResponseEntity<>("Order purchase recipe sent to email!", HttpStatus.OK);
	}
}
