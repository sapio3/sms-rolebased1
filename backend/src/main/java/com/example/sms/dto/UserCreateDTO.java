
package com.example.sms.dto;

import com.example.sms.enums.Role;
import lombok.Data;

@Data
public class UserCreateDTO {
    private String username;
    private String password;
    private Role role;
}
