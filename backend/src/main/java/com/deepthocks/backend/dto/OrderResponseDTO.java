package com.deepthocks.backend.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDTO {
    private int orderId;
    private double shippingFee;
    private double discountAmount;
    private double totalAmount;
    private String status;
    private LocalDateTime createdAt;
}
