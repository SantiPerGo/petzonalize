package org.petzonalize.backend.custom_class;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserOrderData {
    private String name;
    private String email;
    private String phone;
    private String address;
}
