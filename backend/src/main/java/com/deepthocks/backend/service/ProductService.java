package com.deepthocks.backend.service;

import com.deepthocks.backend.dto.ProductDTO;
import com.deepthocks.backend.dto.ProductImageDTO;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private EntityManager entityManager;

    public List<ProductDTO> getAllProductsWithThumbnails() {
        String query = "SELECT new com.deepthocks.backend.dto.ProductDTO(p.productId, p.productName, p.productDescription, p.stockQuantity, p.basePrice, p.salePrice, pi.url) " +
                "FROM Product p JOIN ProductImage pi ON pi.product.productId = p.productId " +
                "WHERE pi.displayOrder = 1";
        return entityManager.createQuery(query, ProductDTO.class).getResultList();
    }

    public List<ProductDTO> getByCategorySlug(int categoryId) {
        String query = "SELECT new com.deepthocks.backend.dto.ProductDTO(p.productId, p.productName, p.productDescription, p.stockQuantity, p.basePrice, p.salePrice, pi.url) " +
                "FROM Product p " +
                "JOIN ProductImage pi ON pi.product.productId = p.productId " +
                "JOIN Category c ON c.categoryId = p.category.categoryId " +
                "WHERE c.parentCategory.categoryId = :categoryId AND pi.displayOrder = 1";
        return entityManager.createQuery(query, ProductDTO.class)
                .setParameter("categoryId", categoryId)
                .getResultList();
    }

    public List<ProductDTO>  getByChildCategorySlug(String parentSlug, String childSlug) {
        String query = "SELECT new com.deepthocks.backend.dto.ProductDTO(p.productId, p.productName, p.productDescription,p.stockQuantity, p.basePrice, p.salePrice, pi.url) " +
                "FROM Product p " +
                "JOIN ProductImage pi ON pi.product.productId = p.productId " +
                "JOIN Category c ON c.categoryId = p.category.categoryId " +
                "JOIN c.parentCategory parent " +
                "WHERE parent.categoryName = :parentSlug AND c.categoryName = :childSlug AND pi.displayOrder = 1";
        return entityManager.createQuery(query, ProductDTO.class)
                .setParameter("parentSlug", parentSlug)
                .setParameter("childSlug", childSlug)
                .getResultList();
    }

    public List<ProductImageDTO> getProductImagesByProductId(int productId) {
        String query ="SELECT new com.deepthocks.backend.dto.ProductImageDTO(pi.url, pi.altText, pi.displayOrder) " +
                "FROM ProductImage pi "+
                "JOIN Product p ON pi.product.productId = p.productId "+
                "WHERE pi.product.productId = :productId";
        return entityManager.createQuery(query,ProductImageDTO.class)
                .setParameter("productId", productId)
                .getResultList();
    }

    public ProductDTO getProductByProductId(int productId) {
        String query = "SELECT new com.deepthocks.backend.dto.ProductDTO(p.productId, p.productName, p.productDescription, p.stockQuantity, p.basePrice, p.salePrice, pi.url) " +
                "FROM Product p " +
                "JOIN ProductImage pi ON pi.product.productId = p.productId " +
                "WHERE p.productId = :productId " +
                "AND pi.displayOrder = 1";
        return entityManager.createQuery(query, ProductDTO.class)
                .setParameter("productId", productId).getSingleResult();
    }

    public List<ProductDTO> searchProducts(String keyword){
        String query = "SELECT new com.deepthocks.backend.dto.ProductDTO(p.productId, p.productName, p.productDescription, p.stockQuantity, p.basePrice, p.salePrice, pi.url)" +
                "FROM Product p " +
                "JOIN ProductImage pi ON pi.product.productId = p.productId " +
                "JOIN p.category c " + // join category (bạn cần mapping đúng trong entity)
                "WHERE pi.displayOrder = 1 " +
                "AND (LOWER(p.productName) LIKE CONCAT('%', LOWER(:keyword), '%') " +
                "OR LOWER(p.productDescription) LIKE CONCAT('%', LOWER(:keyword), '%') " +
                "OR LOWER(c.categoryName) LIKE CONCAT('%', LOWER(:keyword), '%'))";
        return entityManager.createQuery(query, ProductDTO.class)
                .setParameter("keyword", keyword).getResultList();

    }
}
