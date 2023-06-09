package org.petzonalize.backend.controller;

import org.petzonalize.backend.dto.OrderWrapperDTO;
import org.petzonalize.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins="*")
public class OrderController {
	@Autowired
	private OrderService orderService;
	
    @PostMapping
	public ResponseEntity<?> orderProducts(@RequestBody OrderWrapperDTO wrapper) {
    	return orderService.orderProducts(wrapper.getUser(), wrapper.getProducts());
	}
}
