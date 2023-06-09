package org.petzonalize.backend.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.petzonalize.backend.custom.EmailService;
import org.petzonalize.backend.custom.ProductOrder;
import org.petzonalize.backend.entity.model.Order;
import org.petzonalize.backend.entity.model.OrderHasProduct;
import org.petzonalize.backend.entity.model.Product;
import org.petzonalize.backend.entity.model.User;
import org.petzonalize.backend.repository.OrderHasProductRepository;
import org.petzonalize.backend.repository.OrderRepository;
import org.petzonalize.backend.repository.ProductRepository;
import org.petzonalize.backend.repository.UserRepository;
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
    private final EmailService emailService;

    @Autowired
    public OrderServiceImpl(EmailService emailService) {
        this.emailService = emailService;
    }
    
    @Transactional
	@Override
	public ResponseEntity<?> orderProducts(User customer, List<ProductOrder> products) {
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
		
		for(ProductOrder productOrder : products) {
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
        
        // Creating image paths
        products.forEach(product ->
        	product.setImgUrl(getImageNameFromPath(product.getImgUrl()))
        );
        
        // Loading HTML with Thymeleaf
        Context context = new Context();
        context.setVariable("imgName", "Logo.png");
        context.setVariable("products", products);
        context.setVariable("total", total);
        String htmlContent = templateEngine.process("order_recipe", context);

		emailService.sendEmail(user.getEmail(), subject, htmlContent);
		
		return new ResponseEntity<>("Order purchase recipe sent to email!", HttpStatus.OK);
	}
    

    // Extract the image name from the path
    private String getImageNameFromPath(String imagePath) {
        int lastSlashIndex = imagePath.lastIndexOf("/products");
        if (lastSlashIndex != -1 && lastSlashIndex < imagePath.length() - 1) 
            return imagePath.substring(lastSlashIndex + 1);
        else 
            return imagePath;
    }
}
