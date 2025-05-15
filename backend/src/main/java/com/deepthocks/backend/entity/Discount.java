package com.deepthocks.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "discounts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "discount_id")
    private int discountId;

    private String code;

    @Column(name = "discount_type")
    private String discountType;

    @Column(name = "discount_value")
    private double discountValue;

    @Column(name = "min_order_amount")
    private double minOrderAmount;

    @Column(name = "remain_uses")
    private int remainUses;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;
}
