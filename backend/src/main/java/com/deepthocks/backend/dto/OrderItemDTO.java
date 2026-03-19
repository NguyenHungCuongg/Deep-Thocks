package com.deepthocks.backend.dto;

import lombok.AllArgsConstructor;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDTO {
    private int orderItemId;
    private String productName;
    private int quantity;
    private BigDecimal unitPrice;
}
