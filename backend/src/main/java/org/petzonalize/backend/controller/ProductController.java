package org.petzonalize.backend.controller;

import org.petzonalize.backend.dto.HttpResponseDto;
import org.petzonalize.backend.entity.Product;
import org.petzonalize.backend.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins="*")
@ApiResponse(responseCode = "400", description = "Bad request",
	content = @Content(mediaType = "application/json",
		schema = @Schema(implementation = HttpResponseDto.class)))
@Tag(name = "Product Endpoint",
	description = "CRUD for products connecting with Firebase Storage.")
public class ProductController {
	@Autowired
	private ProductService productService;

    @Operation(summary = "Get all products")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful query!",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = Product.class, type = "List"))),
        @ApiResponse(responseCode = "404", description = "Products not found!",
        	content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = HttpResponseDto.class)))
    })
    @GetMapping
    public ResponseEntity<?> getProducts() {
    	return productService.getProducts();
    }

    @Operation(summary = "Create a product")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful product creation!",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = Product.class))),
        @ApiResponse(responseCode = "409", description = "Product already exists",
        	content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = HttpResponseDto.class))),
        @ApiResponse(responseCode = "500",
        	description = "Image couldn't be uploaded into Firebase Storage",
                content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = HttpResponseDto.class)))
    })
    @PostMapping
	public ResponseEntity<?> createProduct(@RequestPart("product") Product product,
            @RequestPart("image") MultipartFile image) {
    	return productService.createProduct(product, image);
	}

    @Operation(summary = "Delete product by id")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful deletion!",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = HttpResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "Product not found!",
        	content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = HttpResponseDto.class)))
    })
    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        return productService.deleteProduct(id);
    }
    
    @Operation(summary = "Update product")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful update!",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = Product.class))),
        @ApiResponse(responseCode = "404", description = "Product not found!",
        	content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = HttpResponseDto.class)))
    })
    @PutMapping
    public ResponseEntity<?> updateProduct(@RequestBody Product product){
        return productService.updateProduct(product);
    }
}
