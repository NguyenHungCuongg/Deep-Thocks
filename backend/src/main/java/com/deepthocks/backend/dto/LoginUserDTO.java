package com.deepthocks.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginUserDTO {
    private String username;
    private String password;
}
