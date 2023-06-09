package org.petzonalize.backend.repository;

import java.util.Optional;

import org.petzonalize.backend.entity.Privilege;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivilegeRepository extends JpaRepository<Privilege, Long> {
	Optional<Privilege> findByPrivilege(String privilege);
}
