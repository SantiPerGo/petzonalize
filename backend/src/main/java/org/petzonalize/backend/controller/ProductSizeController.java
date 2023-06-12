package org.petzonalize.backend.controller;

import org.petzonalize.backend.dto.HttpResponseDto;
import org.petzonalize.backend.entity.ProductSize;
import org.petzonalize.backend.service.ProductSizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/sizes")
@CrossOrigin(origins="*")
@ApiResponse(responseCode = "400", description = "Bad request",
	content = @Content(mediaType = "application/json",
		schema = @Schema(implementation = HttpResponseDto.class)))
@Tag(name = "Product Size Endpoint",
	description = "Product sizes are for customizables like collars, bowls, nameplates, etc.")
public class ProductSizeController {
	@Autowired
	private ProductSizeService productSizeService;

    @Operation(summary = "Get all product sizes")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful query!",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = ProductSize.class, type = "List"))),
        @ApiResponse(responseCode = "404", description = "Product sizes not found!",
        	content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = HttpResponseDto.class)))
    })
    @GetMapping
    public ResponseEntity<?> getSizes() {
    	return productSizeService.getSizes();
    }
}
