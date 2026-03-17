package com.deepthocks.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductCreateDTO {
    private String productName;
    private String productDescription;
    private int categoryId;
    private int stockQuantity;
    private BigDecimal basePrice;
    private BigDecimal salePrice;
    private List<ProductImageDTO> images;
}
