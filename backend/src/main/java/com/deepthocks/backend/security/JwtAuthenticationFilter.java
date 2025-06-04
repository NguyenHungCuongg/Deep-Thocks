package com.deepthocks.backend.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.deepthocks.backend.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
  @Autowired
  private JwtService jwtService;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
        //Từ request, lấy ra header có tên là Authorization
        String authHeader = request.getHeader("Authorization");

        //Nếu header này không null và bắt đầu bằng Bearer thì lấy ra token
        //Bởi hear Bearer là một chuẩn để truyền thông tin xác thực giữa client và server
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
          //Lấy ra token từ header, chỉ cần phần sau Bearer
          //substring(7) là để lấy phần sau Bearer -> lấy từ index thứ 7 về sau
          String token = authHeader.substring(7);
          String username = jwtService.extractUsername(token); //Trích xuất tên người dùng từ token(bằng phương thức đã tạo ở JwtService)

          //Nếu tên người dùng không null và chưa có authentication trong SecurityContextHolder
          if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            //Nếu token hợp lệ thì tạo một đối tượng Authentication
            if (jwtService.isTokenValid(token, username)) {
                // Lấy roles từ token
                List<String> roles = jwtService.extractRoles(token); // Bạn cần viết hàm này trong JwtService

                List<SimpleGrantedAuthority> authorities = roles.stream()
                        .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                        .toList();

              //Constructor cua UsernamePasswordAuthenticationToken cần 3 tham số
              //3 tham số: tên người dùng, mật khẩu, danh sách quyền
              UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                  username, null, authorities);

              //Thiết lập thông tin chi tiết cho đối tượng Authentication và thêm vào SecurityContextHolder
              authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
              SecurityContextHolder.getContext().setAuthentication(authenticationToken);
              System.out.println("Authorities: " + authorities);
            }
          }
        }
        //Gọi phương thức doFilter để tiếp tục chuỗi lọc (nếu không có request thì không làm gì cả)
        filterChain.doFilter(request, response);
  }
}
