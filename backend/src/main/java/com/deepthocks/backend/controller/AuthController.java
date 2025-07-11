package com.deepthocks.backend.controller;

import com.deepthocks.backend.dto.RegisterUserDTO;
import com.deepthocks.backend.dto.LoginUserDTO;
import com.deepthocks.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterUserDTO registerUserDTO) {
        String result = authService.registerUser(registerUserDTO);
        if (result.equals("Đăng ký người dùng thành công!")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginUserDTO loginUserDTO) {
        try{
            String jwtToken = authService.loginUser(loginUserDTO);
            return ResponseEntity.ok(jwtToken);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
