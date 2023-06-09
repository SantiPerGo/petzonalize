package org.petzonalize.backend.repository;

import org.petzonalize.backend.entity.OrderHasProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderHasProductRepository extends JpaRepository<OrderHasProduct, Long> {

}
