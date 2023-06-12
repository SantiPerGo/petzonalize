package org.petzonalize.backend.dto;

import org.springframework.http.HttpStatusCode;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HttpResponseDto {
	private HttpStatusCode status;
	private String response; 
}
