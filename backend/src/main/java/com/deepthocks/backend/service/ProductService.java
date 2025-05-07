package com.deepthocks.backend.service;

import com.deepthocks.backend.dto.ProductDTO;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private EntityManager entityManager;

    public List<ProductDTO> getAllProductsWithThumbnails() {
        String query = "SELECT new com.deepthocks.backend.dto.ProductDTO(p.productId, p.productName, p.productDescription, p.basePrice, p.salePrice, pi.url) " +
                "FROM Product p JOIN ProductImage pi ON pi.product.productId = p.productId " +
                "WHERE pi.displayOrder = 1";
        return entityManager.createQuery(query, ProductDTO.class).getResultList();
    }
}
