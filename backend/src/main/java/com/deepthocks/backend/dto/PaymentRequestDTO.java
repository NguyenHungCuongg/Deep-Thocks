package com.deepthocks.backend.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequestDTO {
    double amount;
}
