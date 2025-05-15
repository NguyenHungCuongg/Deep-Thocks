package com.deepthocks.backend.controller;

import com.deepthocks.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/cart")
public class CartController {
  @Autowired
  private CartService cartService;

  @PostMapping("/add-to-cart")
  public ResponseEntity<?> addToCart(
    @RequestParam int productId
  ) {
    //Lấy tên người dùng từ SecurityContext(được lấy từ JWT token)
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    String result = cartService.addToCart(username, productId);
    return ResponseEntity.ok(result);
  }
}
