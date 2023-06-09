package org.petzonalize.backend.service;

import org.springframework.http.ResponseEntity;

public interface CustomizableService {
    /**
     * Retrieves the list of customizables.
     * @return Response entity with the list of customizables or an error message if none are found
     */
    ResponseEntity<?> getCustomizables();
}
