package org.petzonalize.backend.entity;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserNoPassword {
	private int id;
    private String name;
    private String email;
    private String phone;
    private String privileges;
}
