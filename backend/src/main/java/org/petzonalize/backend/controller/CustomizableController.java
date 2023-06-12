package org.petzonalize.backend.controller;

import org.petzonalize.backend.entity.Customizable;
import org.petzonalize.backend.service.CustomizableService;
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
@RequestMapping("/customizables")
@CrossOrigin(origins="*")
@ApiResponse(responseCode = "400", description = "Bad request",
	content = @Content(mediaType = "application/json",
		schema = @Schema(implementation = String.class)))
@Tag(name = "Customizable Controller",
	description = "Customizables are hats and costumes for pets, also patterns.")
public class CustomizableController {
	@Autowired
	private CustomizableService customizableService;

    @Operation(summary = "Get all customizables")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successful query!",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = Customizable.class, type = "List"))),
        @ApiResponse(responseCode = "404", description = "Customizables not found!",
        	content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = String.class)))
    })
    @GetMapping
    public ResponseEntity<?> getCustomizables() {
    	return customizableService.getCustomizables();
    }
}
