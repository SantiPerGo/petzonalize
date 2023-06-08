package org.petzonalize.backend.repository;

import java.util.Optional;

import org.petzonalize.backend.entity.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
	Optional<User> findByEmail(String email);
}
