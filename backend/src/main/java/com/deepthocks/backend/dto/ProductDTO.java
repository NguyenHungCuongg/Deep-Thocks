package com.deepthocks.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private int productId;
    private String productName;
    private String productDescription;
    private int stockQuantity;
    private double basePrice;
    private double salePrice;
    private String thumbnailUrl;

    public String getThumbnailUrl() {
        return "http://localhost:8080" + thumbnailUrl; // Thêm URL đầy đủ
    }
}
