package org.petzonalize.backend.repository;

import org.petzonalize.backend.entity.UserHasPrivilege;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserHasPrivilegeRepository extends JpaRepository<UserHasPrivilege, Long> {

}
