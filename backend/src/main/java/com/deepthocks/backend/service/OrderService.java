package com.deepthocks.backend.service;

import com.deepthocks.backend.dto.*;
import com.deepthocks.backend.entity.*;
import com.deepthocks.backend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private ExpenseService expenseService;
    @Autowired
    private RevenueService revenueService;

    @Transactional
    public List<OrderResponseDTO> getOrdersByUsername(String username){
        User user = userRepository.findByUsername(username);
        if(user == null) throw new RuntimeException("Người dùng không tồn tại, vui lòng thử lại!");
        List<Order> orderList = orderRepository.findByUser(user);
        List<OrderResponseDTO> orderResponseDTOList = orderList.stream().map(order -> new OrderResponseDTO(
                order.getOrderId(),
                order.getShippingFee(),
                order.getDiscountAmount(),
                order.getTotalAmount(),
                order.getStatus(),
                order.getCreatedAt()
        )).toList();
        return orderResponseDTOList;
    }

    @Transactional
    public List<OrderDTO> getOrders(){
        List<Order> orders = orderRepository.findAll();
        List<OrderDTO> orderDTOs = orders.stream().map(order -> new OrderDTO(
                order.getOrderId(),
                order.getUser().getFullname(),
                order.getUser().getUsername(),
                order.getUser().getEmail(),
                order.getUser().getPhone(),
                order.getAddress().getCity(),
                order.getAddress().getDistrict(),
                order.getAddress().getWard(),
                order.getAddress().getStreet(),
                order.getCreatedAt(),
                order.getPaymentMethod(),
                order.getStatus(),
                order.getOrderItemList().stream()
                        .map(item -> new OrderItemDTO(
                                item.getOrderItemId(),
                                item.getProduct().getProductName(),
                                item.getQuantity(),
                                item.getUnitPrice()
                        )).toList(),
                order.getTotalAmount()
        )).toList();
        return orderDTOs;
    }

    @Transactional
    public OrderResponseDTO createOrder(OrderRequestDTO orderRequestDTO, String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) throw new RuntimeException("Người dùng không tồn tại, vui lòng thử lại!");
        Cart cart = cartRepository.findByUser(user).orElse(null);
        if (cart == null) throw new RuntimeException("Giỏ hàng không tồn tại, vui lòng thử lại!");
        List<CartItem> cartItems = cartItemRepository.findByCart(cart);

        if (cartItems.isEmpty()) throw new RuntimeException("Giỏ hàng của bạn đang rỗng!");

        validateStockAvailability(cartItems);

        Order order = new Order();
        Address address = new Address();
        address.setCity(orderRequestDTO.getCity());
        address.setDistrict(orderRequestDTO.getDistrict());
        address.setWard(orderRequestDTO.getWard());
        address.setStreet(orderRequestDTO.getStreet());
        address.setOrderList(new ArrayList<>());
        addressRepository.save(address);

        BigDecimal subtotal = cartItems.stream()
                .map(cartItem -> getEffectivePrice(cartItem.getProduct())
                        .multiply(BigDecimal.valueOf(cartItem.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal shippingFee = "Đà Nẵng".equals(orderRequestDTO.getCity())
                ? BigDecimal.ZERO
                : BigDecimal.valueOf(34000);
        BigDecimal discountAmount = BigDecimal.ZERO;
        BigDecimal totalAmount = subtotal.add(shippingFee).subtract(discountAmount);
        String paymentMethod = orderRequestDTO.getPaymentMethod();

        order.setUser(user);
        order.setAddress(address);
        order.setCreatedAt(LocalDateTime.now());
        order.setShippingFee(shippingFee);
        order.setDiscountAmount(discountAmount);
        order.setTotalAmount(totalAmount);
        order.setPaymentMethod(paymentMethod);
        order.setStatus("pending");
        order.setOrderItemList(new ArrayList<>());
        orderRepository.save(order);

        List<OrderItem> orderItemList = new ArrayList<>();
        for (CartItem currentCartItem : cartItems) {
            Product currentProduct = currentCartItem.getProduct();
            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(order);
            orderItem.setProduct(currentProduct);
            orderItem.setQuantity(currentCartItem.getQuantity());
            orderItem.setUnitPrice(getEffectivePrice(currentProduct));
            orderItemRepository.save(orderItem);
            orderItemList.add(orderItem);
        }

        order.setOrderItemList(orderItemList);
        orderRepository.save(order);

        address.getOrderList().add(order);
        addressRepository.save(address);

        cartItemRepository.deleteAll(cartItems);

        OrderResponseDTO orderResponseDTO = new OrderResponseDTO();
        orderResponseDTO.setOrderId(order.getOrderId());
        orderResponseDTO.setShippingFee(order.getShippingFee());
        orderResponseDTO.setDiscountAmount(order.getDiscountAmount());
        orderResponseDTO.setTotalAmount(order.getTotalAmount());
        orderResponseDTO.setStatus(order.getStatus());
        orderResponseDTO.setCreatedAt(order.getCreatedAt());
        return orderResponseDTO;
    }

    @Transactional
    public String changeStatusToPaid(int orderId) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order == null) {
            throw new RuntimeException("Không tìm thấy hóa đơn! vui lòng thử lại!");
        }
        if (!"paid".equals(order.getStatus())) {
            try {
                reduceInventoryForOrder(order);
                order.setStatus("paid");
                orderRepository.save(order);
                revenueService.addIncome(order.getTotalAmount(), order.getCreatedAt());
            } catch (ObjectOptimisticLockingFailureException ex) {
                throw new RuntimeException("Tồn kho vừa được cập nhật bởi giao dịch khác. Vui lòng thử lại.");
            }
        }
        return "Đã thay đổi trạng thái hóa đơn!";
    }

    @Transactional
    public String changeStatusToPending(int orderId) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order == null) throw new RuntimeException("Không tìm thấy hóa đơn!");
        if ("paid".equals(order.getStatus())) {
            try {
                restoreInventoryForOrder(order);
                order.setStatus("pending");
                orderRepository.save(order);
                revenueService.subtractIncome(order.getTotalAmount(), order.getCreatedAt());
            } catch (ObjectOptimisticLockingFailureException ex) {
                throw new RuntimeException("Tồn kho vừa được cập nhật bởi giao dịch khác. Vui lòng thử lại.");
            }
        }
        return "Đã thay đổi trạng thái hóa đơn!";
    }

    private void validateStockAvailability(List<CartItem> cartItems) {
        for (CartItem currentCartItem : cartItems) {
            Product currentProduct = currentCartItem.getProduct();
            if (currentProduct.getStockQuantity() < currentCartItem.getQuantity()) {
                throw new RuntimeException("Sản phẩm " + currentProduct.getProductName() + " không đủ hàng");
            }
        }
    }

    private void reduceInventoryForOrder(Order order) {
        for (OrderItem orderItem : order.getOrderItemList()) {
            Product product = productRepository.findById(orderItem.getProduct().getProductId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm để cập nhật tồn kho!"));
            if (product.getStockQuantity() < orderItem.getQuantity()) {
                throw new RuntimeException("Sản phẩm " + product.getProductName() + " không đủ hàng để xác nhận thanh toán");
            }
            product.setStockQuantity(product.getStockQuantity() - orderItem.getQuantity());
            productRepository.saveAndFlush(product);
        }
    }

    private void restoreInventoryForOrder(Order order) {
        for (OrderItem orderItem : order.getOrderItemList()) {
            Product product = productRepository.findById(orderItem.getProduct().getProductId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm để hoàn tồn kho!"));
            product.setStockQuantity(product.getStockQuantity() + orderItem.getQuantity());
            productRepository.saveAndFlush(product);
        }
    }

    private BigDecimal getEffectivePrice(Product product) {
        return product.getSalePrice() != null ? product.getSalePrice() : product.getBasePrice();
    }
}
