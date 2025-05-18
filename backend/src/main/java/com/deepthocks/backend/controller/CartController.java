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
@RequestMapping("/api/carts")
public class CartController {
  @Autowired
  private CartService cartService;

  @PostMapping("/add")
  public ResponseEntity<?> addToCart(
          @RequestBody Map<String, Integer> body
  ) {
    int productId = body.get("productId");
    int quantity = body.get("quantity");
    //Lấy tên người dùng từ SecurityContext(được lấy từ JWT token)
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    String result = cartService.addToCart(username, productId, quantity);
    return ResponseEntity.ok(result);
  }

  @DeleteMapping("/{productId}")
  public ResponseEntity<?> deleteFromCart(
         @PathVariable int productId
  ){
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    String result = cartService.removeFromCart(username, productId);
    return ResponseEntity.ok(result);
  }

  @GetMapping
  public List<CartItemDTO>  getCartItems() {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    List<CartItemDTO> cartItems = cartService.getCartItemsByUsername(username);
    return cartItems != null ? cartItems : List.of();
  }
}
