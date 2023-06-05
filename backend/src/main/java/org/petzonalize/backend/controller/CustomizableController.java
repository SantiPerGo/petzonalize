package org.petzonalize.backend.controller;

import org.petzonalize.backend.service.CustomizableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customizables")
public class CustomizableController {
	@Autowired
	private CustomizableService customizableService;
		
    @GetMapping
    public ResponseEntity<?> getCustomizables() {
    	return customizableService.getCustomizables();
    }
}
