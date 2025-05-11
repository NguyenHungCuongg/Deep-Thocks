package com.deepthocks.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductImageDTO {
    private String url;
    private String altText;
    private int displayOrder;

    public String getURL(){
        return "http://localhost:8080" + url;
    }
}
