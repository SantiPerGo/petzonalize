package org.petzonalize.backend.repository;

import org.petzonalize.backend.entity.ProductProperty;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductPropertyRepository extends JpaRepository<ProductProperty, Long> {

}
