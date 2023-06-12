package org.petzonalize.backend.repository;

import java.util.Optional;

import org.petzonalize.backend.entity.User;
import org.petzonalize.backend.entity.UserHasPrivilege;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserHasPrivilegeRepository extends JpaRepository<UserHasPrivilege, Long> {
	Optional<UserHasPrivilege> findByUser(User user);
}
