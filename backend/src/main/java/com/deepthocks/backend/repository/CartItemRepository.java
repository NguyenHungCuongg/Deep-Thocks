package com.deepthocks.backend.repository;

import com.deepthocks.backend.entity.Cart;
import com.deepthocks.backend.entity.CartItem;
import com.deepthocks.backend.entity.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource(path = "cart-items")
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
  //Trả về CartItem dựa vào Cart và Product
  //Kiểu Optional để tránh NullPointerException, nếu không tìm thấy sẽ trả về Optional.empty()
  Optional<CartItem> findByCartAndProduct(Cart cart, Product product);
  List<CartItem> findByCart(Cart cart);
}
