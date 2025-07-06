package com.deepthocks.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDTO {
  private int productId;
  private String productName;
  private String productThumbnail;
  private int quantity;
  private double price;
}
