package com.deepthocks.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequestDTO {
    private String city;
    private String district;
    private String ward;
    private String street;
    private String paymentMethod;
    private String discountCode;
}
