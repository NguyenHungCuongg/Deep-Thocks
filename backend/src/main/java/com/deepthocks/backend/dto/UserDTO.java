package com.deepthocks.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class UserDTO {
    private int userId;
    private String fullname;
    private String username;
    private String email;
    private String phone;
    private LocalDateTime createdAt;

}
