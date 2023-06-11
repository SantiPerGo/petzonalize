package org.petzonalize.backend.utils;

import java.util.ArrayList;

import org.hibernate.TransientPropertyValueException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;

@ControllerAdvice
public class ExceptionsUtils {
	@ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<String> handleNotReadableException(HttpMessageNotReadableException ex) {
        return new ResponseEntity<>("Error: " + ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
	
	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<ArrayList<String>> handleViolationEx(ConstraintViolationException ex)  {
		ArrayList<String> exceptionsList = new ArrayList<>();
    	
    	for(ConstraintViolation<?> violation: ex.getConstraintViolations())
    		exceptionsList.add("error-" + violation.getPropertyPath()
    			+ ": " + violation.getMessage());
    	
        return new ResponseEntity<>(exceptionsList, HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(TransientPropertyValueException.class)
    public ResponseEntity<String> handleTransientException(TransientPropertyValueException ex) {
        return new ResponseEntity<>("Error: " + ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
