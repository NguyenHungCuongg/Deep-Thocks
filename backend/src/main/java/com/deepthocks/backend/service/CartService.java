package com.deepthocks.backend.service;

import java.time.LocalDateTime;

import com.deepthocks.backend.dto.CartItemDTO;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;
import com.deepthocks.backend.entity.Product;
import com.deepthocks.backend.entity.User;
import com.deepthocks.backend.entity.Cart;
import com.deepthocks.backend.entity.CartItem;
import com.deepthocks.backend.repository.CartItemRepository;
import com.deepthocks.backend.repository.CartRepository;
import com.deepthocks.backend.repository.ProductRepository;
import com.deepthocks.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class CartService {
  @Autowired
  private CartRepository cartRepository;

  @Autowired
  private CartItemRepository cartItemRepository;

  @Autowired
  ProductRepository productRepository;

  @Autowired
  private UserRepository userRepository;

  public List<CartItemDTO> getCartItemsByUsername(String username){
    User user = userRepository.findByUsername(username);
    Cart cart = cartRepository.findByUser(user).orElse(null);
    if (cart == null) {
      return List.of(); // Trả về danh sách rỗng nếu không tìm thấy giỏ hàng
    }
    
    //Lấy danh sách cartItem của giỏ hàng rồi chuyển đổi thành CartItemDTO bằng phương thức map()
    List<CartItemDTO> cartItems = cartItemRepository.findByCart(cart)
      .stream()
        .map(item -> new CartItemDTO(
            item.getProduct().getProductId(),
            item.getProduct().getProductName(),
            item.getProduct().getImageList().isEmpty() ? null : item.getProduct().getImageList().get(0).getUrl(),
            item.getQuantity(),
            item.getProduct().getSalePrice()
        ))
        .toList();
    return cartItems;
  }

  public String addToCart(String username, int productId) {
    User user = userRepository.findByUsername(username);
    Product product = productRepository.findById(productId).orElse(null);
    //Lấy giỏ hàng của người dùng, nếu không có thì thêm dữ liệu mới vào bảng giỏ hàng
    Cart cart = cartRepository.findByUser(user)
        .orElseGet(() -> {
          Cart newCart = Cart.builder()
              .user(user)
              .createdAt(LocalDateTime.now())
              .build();
          return cartRepository.save(newCart);
        });

    //Kiểm tra xem sản phẩm này đã có trong giỏ hàng chưa
    Optional<CartItem> existingCartItem = cartItemRepository.findByCartAndProduct(cart, product);
    //Nếu đã có trong giỏ hàng thì tăng số lượng lên 1
    if (existingCartItem.isPresent()) {
      CartItem cartItem = existingCartItem.get();
      cartItem.setQuantity(cartItem.getQuantity() + 1);
      cartItemRepository.save(cartItem);
    } else {
      CartItem cartItem = CartItem.builder()
          .cart(cart)
          .product(product)
          .quantity(1)
          .build();
      cartItemRepository.save(cartItem);
    }
    return "Thêm sản phẩm vào giỏ hàng thành công!";
  }
}
