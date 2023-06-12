package org.petzonalize.backend.controller;

import org.petzonalize.backend.dto.OrderWrapperDto;
import org.petzonalize.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins="*")
@ApiResponse(responseCode = "400", description = "Bad request",
	content = @Content(mediaType = "application/json",
		schema = @Schema(implementation = String.class)))
@Tag(name = "Order Controller",
	description = "To create an order per user and send the purchase recipe to the user's email.")
public class OrderController {
	@Autowired
	private OrderService orderService;

    @Operation(summary = "Place an order for products")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Order created and email sent!",
        	content = @Content(mediaType = "application/json",
        		schema = @Schema(implementation = String.class)))
    })
    @PostMapping
	public ResponseEntity<?> orderProducts(@RequestBody OrderWrapperDto wrapper) {
    	return orderService.orderProducts(wrapper.getUser(), wrapper.getProducts());
	}
}
