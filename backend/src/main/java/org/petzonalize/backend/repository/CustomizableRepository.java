package org.petzonalize.backend.repository;

import org.petzonalize.backend.entity.model.Customizable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomizableRepository extends JpaRepository<Customizable, Integer> {

}
