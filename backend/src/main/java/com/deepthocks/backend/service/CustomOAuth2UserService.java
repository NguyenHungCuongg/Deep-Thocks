package com.deepthocks.backend.service;

import com.deepthocks.backend.entity.User;
import com.deepthocks.backend.entity.Role;
import com.deepthocks.backend.repository.UserRepository;
import com.deepthocks.backend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();
        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");

        User user = userRepository.findByEmail(email);
        if (user == null) {
            Role customerRole = roleRepository.findByRoleName("CUSTOMER");
            user = User.builder()
                    .fullname(name)
                    .username(email)
                    .email(email)
                    .passwordHash("GOOGLE_USER")
                    .createdAt(LocalDateTime.now())
                    .roleSet(new HashSet<>())
                    .build();
            user.getRoleSet().add(customerRole);
            userRepository.save(user);
        }
        return oAuth2User;
    }
}