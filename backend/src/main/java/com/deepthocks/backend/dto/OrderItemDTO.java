package com.deepthocks.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderItemDTO {
    private int orderItemId;
    private String productName;
    private int quantity;
    private double unitPrice;
}
