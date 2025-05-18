package com.deepthocks.backend.controller;

import com.deepthocks.backend.dto.CartItemDTO;
import com.deepthocks.backend.dto.OrderRequestDTO;
import com.deepthocks.backend.dto.OrderResponseDTO;
import com.deepthocks.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequestDTO orderRequestDTO) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        OrderResponseDTO orderResponseDTO = orderService.createOrder(orderRequestDTO, username);
        return ResponseEntity.ok(orderResponseDTO);
    }
}
