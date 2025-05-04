package com.deepthocks.backend.repository;

import com.deepthocks.backend.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {
}
