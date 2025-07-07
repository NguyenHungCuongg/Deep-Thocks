package com.deepthocks.backend.config;

import com.deepthocks.backend.security.OAuth2AuthenticationSuccessHandler;
import com.deepthocks.backend.service.CustomOAuth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import com.deepthocks.backend.security.SecurityEndpoints;
import com.deepthocks.backend.security.JwtAuthenticationFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFitler;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CustomOAuth2UserService customOAuth2UserService() {
        return new CustomOAuth2UserService();
    }

    @Bean
    public OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler() {
        return new OAuth2AuthenticationSuccessHandler();
    }

    @Bean
    public SecurityFilterChain customSecurityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults()) // Kích hoạt cấu hình CORS riêng
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.POST, SecurityEndpoints.PUBLIC_POST_ENDPOINTS).permitAll() //Cho phép các Endpoint có trong mảng PUBLIC_POST_ENDPOINTS(trong file SecurityEndpoints) được POST mà không cần xác thực
                        .requestMatchers(HttpMethod.GET,SecurityEndpoints.PUBLIC_GET_ENDPOINTS).permitAll() //Cho phép các Endpoint có trong mảng PUBLIC_GET_ENDPOINTS(trong file SecurityEndpoints) được GET mà không cần xác thực
                        .requestMatchers(HttpMethod.GET, SecurityEndpoints.ADMIN_GET_ENDPOINS).hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,SecurityEndpoints.ADMIN_POST_ENDPOINTS).hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE,SecurityEndpoints.ADMIN_DELETE_ENDPOINTS).hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, SecurityEndpoints.ADMIN_PUT_ENDPOINTS).hasRole("ADMIN")
                        .requestMatchers("/oauth2/**" , "/login/oauth2/**").permitAll() //Cho phép các endpoint liên quan đến OAuth2 được truy cập mà không cần xác thực
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFitler, UsernamePasswordAuthenticationFilter.class) //Thêm filter JwtAuthenticationFilter vào trước filter UsernamePasswordAuthenticationFilter
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .oauth2Login(oauth2 -> oauth2
                        .userInfoEndpoint(userInfo -> userInfo
                                .userService(customOAuth2UserService()) // custom service xử lý user Google
                        )
                        .successHandler(oAuth2AuthenticationSuccessHandler())
                );
        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/images/**");
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(SecurityEndpoints.frontendURL)); // Cho phép frontend truy cập
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Các phương thức HTTP được phép
        configuration.setAllowedHeaders(List.of("*")); // Cho phép tất cả các header
        configuration.setAllowCredentials(true); // Cho phép gửi cookie hoặc thông tin xác thực

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Áp dụng cho tất cả các endpoint
        return source;
    }
}
