package com.deepthocks.backend.service;

import com.deepthocks.backend.entity.Revenue;
import com.deepthocks.backend.entity.Expense;
import com.deepthocks.backend.repository.RevenueRepository;
import com.deepthocks.backend.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class RevenueService {
    @Autowired
    private RevenueRepository revenueRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    @Transactional
    public void addIncome(BigDecimal amount, LocalDateTime date) {
        int month = date.getMonthValue();
        int year = date.getYear();
        Revenue revenue = revenueRepository.findByRevenueMonthAndRevenueYear(month, year)
                .orElse(Revenue.builder()
                        .revenueMonth(month)
                        .revenueYear(year)
                        .income(BigDecimal.ZERO)
                        .outcome(BigDecimal.ZERO)
                        .build());
        revenue.setIncome(revenue.getIncome().add(amount));
        revenueRepository.save(revenue);
    }

    @Transactional
    public void subtractIncome(BigDecimal amount, LocalDateTime date) {
        int month = date.getMonthValue();
        int year = date.getYear();
        Revenue revenue = revenueRepository.findByRevenueMonthAndRevenueYear(month, year)
                .orElse(null);
        if (revenue != null) {
            revenue.setIncome(revenue.getIncome().subtract(amount).max(BigDecimal.ZERO));
            revenueRepository.save(revenue);
        }
    }

    @Transactional
    public void updateOutcome(int month, int year) {
        List<Expense> expenses = expenseRepository.findByExpenseMonthAndExpenseYear(month, year);
        BigDecimal totalOutcome = expenses.stream()
                .map(Expense::getExpenseAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        Revenue revenue = revenueRepository.findByRevenueMonthAndRevenueYear(month, year)
                .orElse(Revenue.builder()
                        .revenueMonth(month)
                        .revenueYear(year)
                        .income(BigDecimal.ZERO)
                        .outcome(BigDecimal.ZERO)
                        .build());
        revenue.setOutcome(totalOutcome);
        revenueRepository.save(revenue);
    }

    public List<Revenue> getAllRevenue() {
        return revenueRepository.findAll();
    }
}