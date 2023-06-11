package org.petzonalize.backend.service.impl;

import java.util.List;

import org.petzonalize.backend.entity.Customizable;
import org.petzonalize.backend.repository.CustomizableRepository;
import org.petzonalize.backend.service.CustomizableService;
import org.petzonalize.backend.utils.ResponseUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service("customizableService")
public class CustomizableServiceImpl implements CustomizableService {
    @Autowired
    private CustomizableRepository customizableRepository;

	@Override
	public ResponseEntity<?> getCustomizables() {
        List<Customizable> customizablesList = customizableRepository.findAll();
		
        if(customizablesList.size() == 0)
			return ResponseUtils.mapToJsonResponse(
				"There are no customizables to send as an answer", HttpStatus.NOT_FOUND);
        else
        	return new ResponseEntity<>(customizablesList, HttpStatus.OK);
	}
}
