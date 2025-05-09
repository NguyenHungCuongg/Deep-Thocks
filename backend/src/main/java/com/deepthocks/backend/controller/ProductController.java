package com.deepthocks.backend.controller;

import com.deepthocks.backend.dto.ProductDTO;
import com.deepthocks.backend.dto.ProductImageDTO;
import com.deepthocks.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/categories/{categorySlug}/products")
    public List<ProductDTO> getProductsByCategorySlug(
            @PathVariable String categorySlug) {
        categorySlug = categorySlug.toLowerCase().replaceAll("-", " ");
        int categoryId;
        switch (categorySlug) {
            case "kits":
                categoryId = 1;
                break;
            case "switches":
                categoryId = 2;
                break;
            case "keycaps":
                categoryId = 3;
                break;
            case "others":
                categoryId = 4;
                break;
            default:
                throw new IllegalArgumentException("Invalid category slug");
        }
        return productService.getByCategorySlug(categoryId);
    }

    @GetMapping("/categories/{parentSlug}/{childSlug}/products")
    public List<ProductDTO> getProductsByChildCategorySlug(
            @PathVariable String parentSlug,
            @PathVariable String childSlug
    ){
        parentSlug = parentSlug.toLowerCase().replaceAll("-", " ");
        childSlug = childSlug.toLowerCase().replaceAll("-", " ");
        return productService.getByChildCategorySlug(parentSlug,childSlug);
    }

    @GetMapping("/products")
    public List<ProductDTO> getAllProducts() {
        return  productService.getAllProductsWithThumbnails();
    }

    @GetMapping("/products/{productId}/images")
    public List<ProductImageDTO> getProductImagesByProductId(
            @PathVariable int productId
    ){
        return productService.getProductImagesByProductId(productId);
    }

    @GetMapping("/products/{productId}")
    public ProductDTO getProductByProductId(
            @PathVariable int productId
    ){
        return productService.getProductByProductId(productId);
    }
}
