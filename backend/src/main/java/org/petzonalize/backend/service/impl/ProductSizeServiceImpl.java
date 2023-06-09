package org.petzonalize.backend.service.impl;

import java.util.List;

import org.petzonalize.backend.entity.ProductSize;
import org.petzonalize.backend.repository.ProductSizeRepository;
import org.petzonalize.backend.service.ProductSizeService;
import org.petzonalize.backend.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service("productSizeService")
public class ProductSizeServiceImpl implements ProductSizeService {
    @Autowired
    private ProductSizeRepository productSizeRepository;

	@Override
	public ResponseEntity<?> getSizes() {
        List<ProductSize> sizesList = productSizeRepository.findAll();
		
        if(sizesList.size() == 0)
			return ResponseUtils.mapToJsonResponse(
				"There are no sizes to send as an answer", HttpStatus.NOT_FOUND);
        else
        	return new ResponseEntity<>(sizesList, HttpStatus.OK);
	}
}