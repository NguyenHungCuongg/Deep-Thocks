package com.deepthocks.backend.controller;

import com.deepthocks.backend.dto.CartItemDTO;
import com.deepthocks.backend.dto.OrderDTO;
import com.deepthocks.backend.dto.OrderRequestDTO;
import com.deepthocks.backend.dto.OrderResponseDTO;
import com.deepthocks.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllOrders(){
        try{
            List<OrderDTO> orderList = orderService.getOrders();
            return ResponseEntity.ok(orderList);
        }
        catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getUserOrders(@RequestParam String username){
        try{
            List<OrderResponseDTO> orderList = orderService.getOrdersByUsername(username);
            return ResponseEntity.ok(orderList);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequestDTO orderRequestDTO) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        try{
            OrderResponseDTO orderResponseDTO = orderService.createOrder(orderRequestDTO, username);
            return ResponseEntity.ok(orderResponseDTO);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PostMapping("/paid")
    public  ResponseEntity<?> paidOrder(@RequestBody Map<String, Integer> body) {
        int orderId = body.get("orderId");
        try{
            String result = orderService.changeStatusToPaid(orderId);
            return ResponseEntity.ok(result);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
