package org.petzonalize.backend.custom;

import org.petzonalize.backend.entity.messages.UserMessages;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserOrderData implements UserMessages {
    private static final String notNull = "(string) cannot be null or empty";

    @NotNull
    @Size(max = USERNAME_MAX, message = USERNAME_SIZE )
    @NotBlank(message = USERNAME_NULL)
    private String name;

    @Email
    @NotNull
    @Size(max = USER_EMAIL_MAX, message = USER_EMAIL_SIZE)
    @NotBlank(message = USER_EMAIL_NULL)
    private String email;

    @NotNull
    @Size(min = USER_PHONE_MIN, max = USER_PHONE_MAX,
        message = USER_PHONE_SIZE)
    @NotBlank(message = USER_PHONE_NULL)
    private String phone;

    @NotNull
    @Size(max = USER_ADDRESS_MAX, message = USER_ADDRESS_SIZE)
    @NotBlank(message = USER_ADDRESS_NULL)
    private String address;
}