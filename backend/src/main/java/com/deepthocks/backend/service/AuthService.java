package com.deepthocks.backend.service;

import com.deepthocks.backend.dto.RegisterUserDTO;
import com.deepthocks.backend.dto.LoginUserDTO;
import com.deepthocks.backend.entity.Role;
import com.deepthocks.backend.entity.User;
import com.deepthocks.backend.repository.RoleRepository;
import com.deepthocks.backend.repository.UserRepository;
import com.deepthocks.backend.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private JwtService jwtService;

    public String registerUser(RegisterUserDTO registerUserDTO) {
        if (userRepository.existsByUsername(registerUserDTO.getUsername())) {
            return "Tên đăng nhập này đã được sử dụng!";
        }
        if (userRepository.existsByEmail(registerUserDTO.getEmail())) {
            return "Email này đã được sử dụng!";
        }

        Role customerRole = roleRepository.findByRoleName("CUSTOMER");

        String encodedPassword = bCryptPasswordEncoder.encode(registerUserDTO.getPassword());

        User user = User.builder()
                .fullname(registerUserDTO.getFullname())
                .username(registerUserDTO.getUsername())
                .passwordHash(encodedPassword)
                .email(registerUserDTO.getEmail())
                .phone(registerUserDTO.getPhone())
                .createdAt(LocalDateTime.now())
                .roleSet(new HashSet<>())
                .build();
        user.getRoleSet().add(customerRole);
        userRepository.save(user);

        return "Đăng ký người dùng thành công!";
    }

    //Phương thức này sẽ trả về chuỗi JWT token nếu đăng nhập thành công
    public String loginUser(LoginUserDTO loginUserDTO){
        User loginUser = userRepository.findByUsername(loginUserDTO.getUsername());
        if(loginUser == null) {
            throw new RuntimeException("Tên đăng nhập không tồn tại!");
        }
        if (!bCryptPasswordEncoder.matches(loginUserDTO.getPassword(), loginUser.getPasswordHash())) {
            throw new RuntimeException("Mật khẩu không chính xác!");
        }
        String token = jwtService.generateToken(loginUser.getUsername());
        return token;
    }
}
