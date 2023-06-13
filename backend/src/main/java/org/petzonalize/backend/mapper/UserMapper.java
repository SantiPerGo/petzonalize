package org.petzonalize.backend.mapper;

import org.petzonalize.backend.dto.UserWithPrivilegeDto;
import org.petzonalize.backend.entity.User;
import org.petzonalize.backend.entity.UserHasPrivilege;

public abstract class UserMapper {	
	public static UserWithPrivilegeDto mapToUserWithPrivilege(UserHasPrivilege userHasPrivilege) {
		User user = userHasPrivilege.getUser();
		
		UserWithPrivilegeDto newUser = UserWithPrivilegeDto.builder()
			.id(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .phone(user.getPhone())
            .address(user.getAddress())
            .build();
		
		newUser.setPrivilege(userHasPrivilege.getPrivilege().getPrivilege());
	
		return newUser;
	}
}
