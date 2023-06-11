package org.petzonalize.backend.dto;

import java.util.List;

import org.petzonalize.backend.entity.User;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderWrapperDTO {
	private User user;
	private List<ProductDto> products;
}
