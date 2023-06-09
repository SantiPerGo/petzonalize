package org.petzonalize.backend.repository;

import org.petzonalize.backend.entity.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {

}
