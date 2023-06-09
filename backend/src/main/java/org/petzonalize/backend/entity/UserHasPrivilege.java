package org.petzonalize.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="users_has_privileges")
public class UserHasPrivilege {

	@ManyToOne
    @JoinColumn(name = "user_id")
    private User order;
	
	@ManyToOne
    @JoinColumn(name = "privilege_id")
    private Privilege product;
}
