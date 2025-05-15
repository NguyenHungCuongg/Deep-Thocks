package com.deepthocks.backend.controller;

import com.deepthocks.backend.dto.CartItemDTO;
import com.deepthocks.backend.service.CartService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api")
public class CartController {
  @Autowired
  private CartService cartService;

  @PostMapping("/cart/add")
  public ResponseEntity<?> addToCart(
          @RequestBody Map<String, Integer> body
  ) {
    int productId = body.get("productId");
    //Lấy tên người dùng từ SecurityContext(được lấy từ JWT token)
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    System.out.println("Username đang thêm vào giỏ hàng là: " + username);
    String result = cartService.addToCart(username, productId);
    return ResponseEntity.ok(result);
  }

  @GetMapping("/cart")
  public List<CartItemDTO>  getCartItems() {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    return cartService.getCartItemsByUsername(username);
  }
}
