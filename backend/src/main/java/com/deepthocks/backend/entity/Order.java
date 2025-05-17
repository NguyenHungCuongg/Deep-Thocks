package com.deepthocks.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private int orderId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "shipping_fee")
    private double shippingFee;

    @Column(name = "discount_amount")
    private double discountAmount;

    @Column(name = "total_amount")
    private double totalAmount;

    @Column
    private String status;

    @Column(name = "payment_method")
    private String paymentMethod;

    @OneToMany(mappedBy = "order")
    private List<OrderItem> orderItemList;
}