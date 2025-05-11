package com.deepthocks.backend.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class RegisterUserDTO {
    private String email;
    private String phone;
    private String fullname;
    private String username;
    private String password;
}
