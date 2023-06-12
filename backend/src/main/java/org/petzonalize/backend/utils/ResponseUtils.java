package org.petzonalize.backend.utils;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

public class ResponseUtils {
	public static ResponseEntity<?> mapToJsonResponse
		(String response, HttpStatusCode status) {
		
		return new ResponseEntity<>("{\"response\":\""+response+"\"}", status);
	}
}
