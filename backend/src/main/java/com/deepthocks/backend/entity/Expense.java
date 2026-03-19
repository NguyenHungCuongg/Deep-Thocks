package com.deepthocks.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "expenses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "expense_id")
    private int expenseId;

    @Column(name = "expense_month")
    private int expenseMonth;

    @Column(name = "expense_year")
    private int expenseYear;

    @Column(name = "expense_amount", precision = 19, scale = 2)
    private BigDecimal expenseAmount;
}