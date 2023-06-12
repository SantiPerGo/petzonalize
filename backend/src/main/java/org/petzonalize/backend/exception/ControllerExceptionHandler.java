package org.petzonalize.backend.exception;

import java.util.ArrayList;

import org.hibernate.TransientPropertyValueException;
import org.petzonalize.backend.dto.HttpResponseDto;
import org.petzonalize.backend.utils.ResponseUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@ControllerAdvice
public class ControllerExceptionHandler {
    @Operation(summary = "Handle HttpMessageNotReadableException")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Bad Request",
            content = @Content(mediaType = "text/plain",
                schema = @Schema(implementation = HttpResponseDto.class)))
    })
	@ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleNotReadableException(HttpMessageNotReadableException ex) {
        return ResponseUtils.mapToJsonResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @Operation(summary = "Handle ConstraintViolationException")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Bad Request",
            content = @Content(mediaType = "application/json",
                schema = @Schema(implementation = ArrayList.class)))
    })
	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<ArrayList<String>> handleViolationEx(ConstraintViolationException ex)  {
		ArrayList<String> exceptionsList = new ArrayList<>();
    	
    	for(ConstraintViolation<?> violation: ex.getConstraintViolations())
    		exceptionsList.add(violation.getPropertyPath() + ": " + violation.getMessage());
    	
        return new ResponseEntity<>(exceptionsList, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(TransientPropertyValueException.class)
    @Operation(summary = "Handle TransientPropertyValueException")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Bad Request",
            content = @Content(mediaType = "text/plain",
                schema = @Schema(implementation = HttpResponseDto.class)))
    })
    public ResponseEntity<?> handleTransientException(TransientPropertyValueException ex) {
        return ResponseUtils.mapToJsonResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
