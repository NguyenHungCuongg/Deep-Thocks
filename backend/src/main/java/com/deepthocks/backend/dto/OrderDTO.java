package com.deepthocks.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class OrderDTO {
    private int orderId;
    private String fullname;
    private String username;
    private String email;
    private String phone;
    private String city;
    private String district;
    private String ward;
    private String street;
    private LocalDateTime createdAt;
    private String paymentMethod;
    private String status;
    private List<OrderItemDTO> orderItemList;
    private double totalAmount;
}
