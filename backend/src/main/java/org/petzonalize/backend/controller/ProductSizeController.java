package org.petzonalize.backend.controller;

import org.petzonalize.backend.service.ProductSizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sizes")
@CrossOrigin(origins="*")
public class ProductSizeController {
	@Autowired
	private ProductSizeService productSizeService;
		
    @GetMapping
    public ResponseEntity<?> getSizes() {
    	return productSizeService.getSizes();
    }
}
