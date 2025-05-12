package com.deepthocks.backend.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {
    //Khóa bí mật của JWT
    private static final String SECRET_KEY = "248cd6b934536a5cd31b271457b4fb1a453bb416760dba1ad14f7091c3ef0f7cbb75d76a7b987ecaef6750641fb91cef3c5f9249719ef1601f917b4b6bc14d088334375b560127b1bf782a095ff3df0fa7cda2a92d4ebe5b19f413cc75c5a0e327a5a6d0d52341d269eb2821e91b62854c6ea28d084f471adbba61d5327e97cb9ee6697a3f5c7de340f6dc86fc5d8506e31f5174523ff6f522ab116158663d9f01b53d0dd3468ad75e5a7c687d3874635aa760f317a7ca0f95e3795283a430b06ecfd7e86ba9302a68e9326847d189a2313f4250ecf1ad8587580f52aae96f471a385003566f42efd2a461b37e9fcb04956e52df2551c167668d5f2970f106d5";

    //Thời gian duy trì của JWT(tính bằng mili giây)
    private static final long EXPIRATION_TIME = 360000000; //100 giờ

    //Getter cho SECRET_KEY (nhưng được mã hóa bằng BASE64)
    private Key getSigningKey(){
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes()); //Giúp trả về kiểu dữ liệu Key(một Object trong io.jsonwebtoken.security)
    }

    public String generateToken(String username){
        Map<String, Object> extraClaims = new HashMap<>();
        return buildToken(username,extraClaims);
    }

    //Tạo Token với các Claims bổ sung
    public String buildToken(String email, Map<String, Object> extraClaims){
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) //Thời hạn được tính bằng
                .signWith(SignatureAlgorithm.HS512, getSigningKey())
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
