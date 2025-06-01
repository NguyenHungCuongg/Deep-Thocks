package com.deepthocks.backend.service;

import com.deepthocks.backend.entity.Role;
import com.deepthocks.backend.entity.User;
import com.deepthocks.backend.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {
    @Autowired
    private UserRepository userRepository;
    //Khóa bí mật của JWT
    @Value("${jwt.secret}")
    private String SECRET_KEY;

    //Thời gian duy trì của JWT(tính bằng mili giây)
    private static final long EXPIRATION_TIME = 360000000; //100 giờ

    public JwtService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //Getter cho SECRET_KEY (nhưng được mã hóa bằng BASE64)
    private Key getSigningKey(){
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes()); //Giúp trả về kiểu dữ liệu Key(một Object trong io.jsonwebtoken.security)
    }

    public String generateToken(String username){
        User user = userRepository.findByUsername(username);
        var roles = user.getRoleSet().stream() //Chỉ lấy danh sách tên Role(một chuỗi string thay vì một chuỗi Object Role)
                .map(Role::getRoleName)
                .toList();
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("username", username); //Phải thêm thông tin "username" vào payload để ta có thể trích xuất về sau
        extraClaims.put("roles", roles);
        return buildToken(username,extraClaims);
    }

    //Tạo Token với các Claims bổ sung
    public String buildToken(String username, Map<String, Object> extraClaims){
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) //Thời hạn được tính bằng
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    //Trích xuất username từ Jwt Token
    public String extractUsername(String token){
        return Jwts.parser()
                .setSigningKey(getSigningKey())
                .build().parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    //Kiểm tra Token có hợp lệ hay không (so sánh Username trong Request và Username được trích từ JWT Token)
    public boolean isTokenValid(String token, String username){
        String extractedUsername = extractUsername(token);
        return username.equals(extractedUsername); //Nếu Username trong Request giống với Username được trích xuất từ Token thì hợp lệ
    }

    //Kiểm tra Token đã hết hạn chưa
    private boolean isTokenExpired(String token){
        Date experation =  Jwts.parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return experation.before(new Date()); //Nếu experation(thời gian hết hạn) trước thời gian hiện tại -> tức là đã hết hạn -> trả về true.
    }
}
