package org.petzonalize.backend.mapper;

import org.petzonalize.backend.entity.Privilege;
import org.petzonalize.backend.entity.User;
import org.petzonalize.backend.entity.UserHasPrivilege;

public abstract class UserHasPrivilegeMapper {
	public static UserHasPrivilege mapToUserHasPrivilege(User user, Privilege privilege) {
		return UserHasPrivilege.builder()
			.id(null)
			.user(user)
			.privilege(privilege)
			.build();
	}
}
