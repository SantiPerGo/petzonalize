package org.petzonalize.backend.mapper;

import org.petzonalize.backend.entity.Privilege;
import org.petzonalize.backend.entity.User;

public abstract class UserMapper {
	public static User mapToUserWithoutPassword(User user) {
		return User.builder()
			.id(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .phone(user.getPhone())
            .privileges(user.getPrivileges())
            .build();
	}
	
	public static User mapToUserWithPrivilege(User user, Privilege privilege) {
		return User.builder()
			.id(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .phone(user.getPhone())
            .privileges(privilege)
            .build();
	}
}
