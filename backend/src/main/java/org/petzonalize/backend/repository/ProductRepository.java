package org.petzonalize.backend.repository;

import java.util.Optional;

import org.petzonalize.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	Optional<Product> findByName(String name);
}
