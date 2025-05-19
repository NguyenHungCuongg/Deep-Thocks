package com.deepthocks.backend.controller;

import com.deepthocks.backend.dto.UserProfileDTO;
import com.deepthocks.backend.entity.User;
import com.deepthocks.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/profile")
public class UserProfileController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getUserProfile() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username);
        if (user == null) return ResponseEntity.notFound().build();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        String createdAt = user.getCreatedAt().format(formatter);
        UserProfileDTO userDTO = new UserProfileDTO(
                user.getFullname(),
                user.getUsername(),
                user.getEmail(),
                user.getPhone(),
                user.getCreatedAt() != null ? createdAt : null
        );
        return ResponseEntity.ok(userDTO);
    }
}
