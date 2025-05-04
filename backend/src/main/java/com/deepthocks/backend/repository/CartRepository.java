package com.deepthocks.backend.repository;

import com.deepthocks.backend.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<CartItem, Integer> {
}
