package org.petzonalize.backend.repository;

import org.petzonalize.backend.entity.model.OrderHasProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderHasProductRepository extends JpaRepository<OrderHasProduct, Integer> {

}
