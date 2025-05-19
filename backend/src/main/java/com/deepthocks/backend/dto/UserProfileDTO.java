package com.deepthocks.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserProfileDTO {
    private String fullname;
    private String username;
    private String email;
    private String phone;
    private String createdAt;
}
