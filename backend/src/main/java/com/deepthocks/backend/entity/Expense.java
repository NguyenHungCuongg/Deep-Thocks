package com.deepthocks.backend.entity;

import jakarta.persistence.*;
import lombok.*;

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

    @Column(name = "expense_amount")
    private double expenseAmount;
}