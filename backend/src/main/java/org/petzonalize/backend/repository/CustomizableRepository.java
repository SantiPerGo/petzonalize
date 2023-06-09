package org.petzonalize.backend.repository;

import org.petzonalize.backend.entity.Customizable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomizableRepository extends JpaRepository<Customizable, Long> {

}
