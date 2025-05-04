package com.deepthocks.backend.repository;

import com.deepthocks.backend.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "carts")
public interface CartRepository extends JpaRepository<CartItem, Integer> {
}
