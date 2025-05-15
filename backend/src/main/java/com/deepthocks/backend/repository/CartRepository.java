package com.deepthocks.backend.repository;

import com.deepthocks.backend.entity.Cart;
import com.deepthocks.backend.entity.User;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "carts")
public interface CartRepository extends JpaRepository<Cart, Integer> {
  Optional<Cart> findByUser(User user);
}
