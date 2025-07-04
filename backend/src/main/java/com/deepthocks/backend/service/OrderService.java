package com.deepthocks.backend.service;

import com.deepthocks.backend.dto.*;
import com.deepthocks.backend.entity.*;
import com.deepthocks.backend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        //Lấy các đối tượng cần thiết (đã có)
        User user = userRepository.findByUsername(username);
        if (user == null) throw new RuntimeException("Người dùng không tồn tại, vui lòng thử lại!");
        Cart cart = cartRepository.findByUser(user).orElse(null);
        if (cart == null) throw new RuntimeException("Giỏ hàng không tồn tại, vui lòng thử lại!");
        List<CartItem> cartItems = cartItemRepository.findByCart(cart);

        //Tạo các đối tượng cần có trong Order(chưa có)
        Order order = new Order();
        Address address = new Address();

        //Xử lý nếu giỏ hàng rỗng
        if(cartItems.isEmpty())throw new RuntimeException("Giỏ hàng của bạn đang rỗng!");

        //Kiểm tra stock có đủ chưa
        for(CartItem currentCartItem : cartItems){
            //Lấy quantity của CartItem so sánh với stock của Product
            Product currentProduct = currentCartItem.getProduct();
            if(currentProduct.getStockQuantity() < currentCartItem.getQuantity()) {
                throw new RuntimeException("Sản phẩm " + currentProduct.getProductName() + " không đủ hàng");
            }
        }

        //Xử lý địa chỉ được người dùng nhập
        address.setCity(orderRequestDTO.getCity());
        address.setDistrict(orderRequestDTO.getDistrict());
        address.setWard(orderRequestDTO.getWard());
        address.setStreet(orderRequestDTO.getStreet());
        address.setOrderList(new ArrayList<>()); //Đặt ArrayList mởi để tránh NullPointerException trước
        addressRepository.save(address);

        //Tính tổng tiền hàng (CHƯA phải totalAmount của entity Order)
        double subtotal = 0;
        for(CartItem currentCartItem : cartItems){
            Product currentProduct = currentCartItem.getProduct();
            double currentProductTotalPrice = currentProduct.getSalePrice() * currentCartItem.getQuantity();
            subtotal += currentProductTotalPrice;
        }

        //Tính tiền ship, ngoại tỉnh thì đồng giá 34k, đà nẵng thì free
        double shippingFee = orderRequestDTO.getCity().equals("Đà Nẵng") ? 0 : 34000;

        //Tính tiền discount(hiện tại chưa làm tính năng này nên mặc định không có discount)
        double discountAmount = 0;

        //Tính tổng thanh toán
        double totalAmount = subtotal + shippingFee - discountAmount;

        //Lấy phương thức đặt hàng
        String paymentMethod = orderRequestDTO.getPaymentMethod();

        //Tạo hóa đơn từ các thông tin đã tìm được trên
        order.setUser(user);
        order.setAddress(address);
        order.setCreatedAt(LocalDateTime.now());
        order.setShippingFee(shippingFee);
        order.setDiscountAmount(discountAmount);
        order.setTotalAmount(totalAmount);
        order.setPaymentMethod(paymentMethod);
        order.setStatus(paymentMethod.equals("cod")? "pending" : "paid");
        order.setOrderItemList(new ArrayList<>()); //Đặt ArrayList mởi để tránh NullPointerException trước
        orderRepository.save(order);

        //Tạo danh sách các chi tiết hóa đơn (sao cho tồn tại quan hệ ManyToOne: OrderItem - Order, OrderItem - Product)
        List<OrderItem> orderItemList = new ArrayList<>();
        for(CartItem currentCartItem : cartItems){
            Product currentProduct = currentCartItem.getProduct();
            OrderItem orderItem = new OrderItem();

            orderItem.setOrder(order);
            orderItem.setProduct(currentProduct);
            orderItem.setQuantity(currentCartItem.getQuantity());
            orderItem.setUnitPrice(currentProduct.getSalePrice());
            orderItemRepository.save(orderItem);

            //Lúc này ta mới thêm vào OrderItemList của Order
            order.getOrderItemList().add(orderItem);

            //Trừ đi tồn kho sản phẩm
            currentProduct.setStockQuantity(currentProduct.getStockQuantity() -  currentCartItem.getQuantity());
            productRepository.save(currentProduct);

            orderItemList.add(orderItem);
        }

        //Cập nhật lại OrderItemList trong Order(lúc trước là new ArrayList<> rỗng)
        order.setOrderItemList(orderItemList);
        orderRepository.save(order); //Lưu lại luôn -> phải làm nhiều bước như này để tránh các trường hợp lỗi NullPointerException

        //Cập nhật lại OrderLt trong Address luôn
        address.getOrderList().add(order);
        addressRepository.save(address);

        //Xóa các CartItem trong Cart hiện tại
        cartItemRepository.deleteAll(cartItems);

        // Nếu đơn hàng là paid (không phải COD), cập nhật revenue
        if (!paymentMethod.equals("cod")) {
            revenueService.addIncome(order.getTotalAmount(), order.getCreatedAt());
        }

        //Trả về
        OrderResponseDTO orderResponseDTO = new OrderResponseDTO();
        orderResponseDTO.setOrderId(order.getOrderId());
        orderResponseDTO.setShippingFee(order.getShippingFee());
        orderResponseDTO.setDiscountAmount(order.getDiscountAmount());
        orderResponseDTO.setTotalAmount(order.getTotalAmount());
        orderResponseDTO.setStatus(order.getStatus());
        orderResponseDTO.setCreatedAt(order.getCreatedAt());
        return orderResponseDTO;
    }

    public String changeStatusToPaid(int orderId) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order == null) {throw new RuntimeException("Không tìm thấy hóa đơn! vui lòng thử lại!");}
        if (!"paid".equals(order.getStatus())) {
            order.setStatus("paid");
            orderRepository.save(order);
            revenueService.addIncome(order.getTotalAmount(), order.getCreatedAt());
        }
        return "Đã thay đổi trạng thái hóa đơn!";
    }

    public String changeStatusToPending(int orderId) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order == null) throw new RuntimeException("Không tìm thấy hóa đơn!");
        if ("paid".equals(order.getStatus())) {
            order.setStatus("pending");
            orderRepository.save(order);
            revenueService.subtractIncome(order.getTotalAmount(), order.getCreatedAt());
        }
        return "Đã thay đổi trạng thái hóa đơn!";
    }
}
