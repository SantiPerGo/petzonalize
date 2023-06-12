package org.petzonalize.backend.repository;

import org.petzonalize.backend.entity.Order;
import org.petzonalize.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
	void deleteByUser(User user);
}
