package com.deepthocks.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "revenue")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Revenue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "revenue_id")
    private int revenueId;

    @Column(name = "revenue_month")
    private int revenueMonth;

    @Column(name = "revenue_year")
    private int revenueYear;

    @Column(name = "income", precision = 19, scale = 2)
    private BigDecimal income;

    @Column(name = "outcome", precision = 19, scale = 2)
    private BigDecimal outcome;
}
