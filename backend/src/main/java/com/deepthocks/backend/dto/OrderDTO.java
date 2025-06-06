package com.deepthocks.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class OrderDTO {
    private int orderId;
    private String fullname;
    private LocalDateTime createdAt;
    private String status;
    private double totalAmount;
}
