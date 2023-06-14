package org.petzonalize.backend.service.impl;

import java.util.List;
import java.util.Optional;

import org.petzonalize.backend.dto.ProductDto;
import org.petzonalize.backend.entity.Order;
import org.petzonalize.backend.entity.OrderHasProduct;
import org.petzonalize.backend.entity.Product;
import org.petzonalize.backend.entity.User;
import org.petzonalize.backend.mapper.OrderHasProductMapper;
import org.petzonalize.backend.mapper.OrderMapper;
import org.petzonalize.backend.repository.OrderHasProductRepository;
import org.petzonalize.backend.repository.OrderRepository;
import org.petzonalize.backend.repository.ProductRepository;
import org.petzonalize.backend.repository.UserRepository;
import org.petzonalize.backend.service.OrderService;
import org.petzonalize.backend.utils.EmailUtils;
import org.petzonalize.backend.utils.FirebaseUtils;
import org.petzonalize.backend.utils.ResponseUtils;
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
    private TemplateEngine templateEngine;
    
    private final EmailUtils emailUtils;
    public OrderServiceImpl(EmailUtils emailUtils) {
        this.emailUtils = emailUtils;
    }
    
    @Transactional
	@Override
	public ResponseEntity<?> orderProducts(User customer, List<ProductDto> products) {
    	Optional<User> optionalUser = userRepository.findByEmail(customer.getEmail());
		
    	User user;
    	
    	// If user doesn't exist, we have to create it
    	if(optionalUser.isPresent())
    		user = optionalUser.get();
    	else {
    		user = customer;
    		user.setId(0L);
    		userRepository.saveAndFlush(user);
    	}    	
		
    	Order order = OrderMapper.mapToOrder(user);
    	
		// Creating order
		orderRepository.saveAndFlush(order);
		
		double total = 0; 
		int totalAmount = 0;
		
		for(ProductDto productOrder : products) {
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
					
					OrderHasProduct orderHasProduct =
							OrderHasProductMapper.mapToOrderHasProduct(order, product);
					
					// Creating connection between order and product
					orderHasProductRepository.saveAndFlush(orderHasProduct);
				} else {
					return ResponseUtils.mapToJsonResponse("Product amount is greater than stock: " +
							productOrder, HttpStatus.BAD_REQUEST);
				}
			} else {
				return ResponseUtils.mapToJsonResponse("Product not found: " +
						productOrder, HttpStatus.BAD_REQUEST);
			}
		}
		
		// Total cost rounded to 2 decimals
		total = Math.round(total * 100.0) / 100.0;

        String subject = "Petzonalize - ¡Gracias por tu Compra!";
        String logoUrl = FirebaseUtils.getImageUrlByName(
        		FirebaseUtils.getImagesFromFirebaseStorage(), "Logo.png");
        
        // Loading HTML with Thymeleaf
        Context context = new Context();
        context.setVariable("logoUrl", logoUrl);
        context.setVariable("products", products);
        context.setVariable("total", total);
        context.setVariable("totalAmount", totalAmount);
        String htmlContent = templateEngine.process("order_recipe", context);

		emailUtils.sendEmail(user.getEmail(), subject, htmlContent);

		return ResponseUtils.mapToJsonResponse("Order purchase recipe sent to email!",
			HttpStatus.OK);
	}
}
