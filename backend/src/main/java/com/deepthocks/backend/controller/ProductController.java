package com.deepthocks.backend.controller;

import com.deepthocks.backend.dto.ProductCreateDTO;
import com.deepthocks.backend.dto.ProductDTO;
import com.deepthocks.backend.dto.ProductImageDTO;
import com.deepthocks.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/products/search")
    //@RequestParam dùng để truy xuất giá trị keyword trong Url -> vd: /search?keyword=switches-akko -> keyword = switches-akko
    //Trả về Object ResponseEntity (là một Object để xác định Response thành công(status:200) hay thất bại(status:400,500,...))
    public ResponseEntity<?> searchProducts(@RequestParam String keyword) {
        try {
            List<ProductDTO> products = productService.searchProducts(keyword);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            System.err.println("Không thể Search: " +e.getMessage());
            return ResponseEntity.status(500).body("Error occurred while searching for products: " + e.getMessage());
        }
    }

    //Để Endpoint "/products/search" trước Endpoint "/products/{productId}" để tránh xung đột
    @GetMapping("/products/{productId}")
    public ProductDTO getProductByProductId(
            @PathVariable int productId
    ){
        return productService.getProductByProductId(productId);
    }

    @PostMapping("/products")
    public ResponseEntity<?> createProduct(@RequestBody ProductCreateDTO productCreateDTO) {
        try{
            String result = productService.createProductWithImages(productCreateDTO);
            return ResponseEntity.ok(result);
        }
        catch (Exception e){
            return  ResponseEntity.status(500).body("Error occurred while creating product: " + e.getMessage());
        }
    }

    @DeleteMapping("/products/{productId}")
    public ResponseEntity<?> deleteProduct(
            @PathVariable int productId
    ){
        try{
            String result = productService.deleteProductById(productId);
            return ResponseEntity.ok(result);
        }
        catch(Exception e){
            return ResponseEntity.status(500).body("Error occurred while deleting product: " + e.getMessage());
        }
    }

    @PutMapping("/products/{productId}")
    public ResponseEntity<?> updateProduct(
            @PathVariable int productId,
            @RequestBody ProductCreateDTO productCreateDTO
    ){
        try{
            String result = productService.updateProductById(productId, productCreateDTO);
            return ResponseEntity.ok(result);
        }
        catch (Exception e){
            return ResponseEntity.status(500).body("Error occurred while updating product: " + e.getMessage());
        }
    }
}
