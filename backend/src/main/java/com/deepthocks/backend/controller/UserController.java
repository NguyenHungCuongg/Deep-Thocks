package com.deepthocks.backend.controller;

import com.deepthocks.backend.dto.UserDTO;
import com.deepthocks.backend.entity.User;
import com.deepthocks.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<UserDTO> getUsers() {
        List<User> users = userRepository.findAll();

        List<UserDTO> userDTOs = users.stream().map(user -> new UserDTO(
                user.getUserId(), user.getFullname(), user.getUsername(),
                user.getEmail(),user.getPhone(),user.getCreatedAt())
        ).toList();
        return userDTOs;
    }
}
