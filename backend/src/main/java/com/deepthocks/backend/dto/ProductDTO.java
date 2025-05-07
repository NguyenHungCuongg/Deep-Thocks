package com.deepthocks.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductDTO {
    private int productId;
    private String productName;
    private String productDescription;
    private double basePrice;
    private double salePrice;
    private String thumbnailUrl;
}
