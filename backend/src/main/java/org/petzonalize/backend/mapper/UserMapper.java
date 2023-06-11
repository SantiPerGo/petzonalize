package org.petzonalize.backend.mapper;

import org.petzonalize.backend.dto.UserNoPasswordDto;
import org.petzonalize.backend.entity.User;

public abstract class UserMapper {
	public static UserNoPasswordDto mapToUserWithoutPassword(User user) {
		return UserNoPasswordDto.builder()
			.id(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .phone(user.getPhone())
            .address(user.getAddress())
            .build();
	}
}
