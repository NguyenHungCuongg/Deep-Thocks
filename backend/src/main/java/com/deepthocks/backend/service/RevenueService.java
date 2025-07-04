package com.deepthocks.backend.service;

import com.deepthocks.backend.entity.Revenue;
import com.deepthocks.backend.entity.Expense;
import com.deepthocks.backend.repository.RevenueRepository;
import com.deepthocks.backend.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RevenueService {
    @Autowired
    private RevenueRepository revenueRepository;

    @Autowired
    private ExpenseRepository expenseRepository;

    // Tăng income khi đơn hàng paid
    @Transactional
    public void addIncome(double amount, LocalDateTime date) {
        int month = date.getMonthValue();
        int year = date.getYear();
        Revenue revenue = revenueRepository.findByRevenueMonthAndRevenueYear(month, year)
                .orElse(Revenue.builder()
                        .revenueMonth(month)
                        .revenueYear(year)
                        .income(0)
                        .outcome(0)
                        .build());
        revenue.setIncome(revenue.getIncome() + amount);
        revenueRepository.save(revenue);
    }

    // Giảm income khi đơn hàng bị hủy hoặc chuyển về pending
    @Transactional
    public void subtractIncome(double amount, LocalDateTime date) {
        int month = date.getMonthValue();
        int year = date.getYear();
        Revenue revenue = revenueRepository.findByRevenueMonthAndRevenueYear(month, year)
                .orElse(null);
        if (revenue != null) {
            revenue.setIncome(Math.max(0, revenue.getIncome() - amount));
            revenueRepository.save(revenue);
        }
    }

    // Cập nhật outcome khi thêm/sửa/xóa expense
    @Transactional
    public void updateOutcome(int month, int year) {
        List<Expense> expenses = expenseRepository.findByExpenseMonthAndExpenseYear(month, year);
        double totalOutcome = expenses.stream().mapToDouble(Expense::getExpenseAmount).sum();
        Revenue revenue = revenueRepository.findByRevenueMonthAndRevenueYear(month, year)
                .orElse(Revenue.builder()
                        .revenueMonth(month)
                        .revenueYear(year)
                        .income(0)
                        .outcome(0)
                        .build());
        revenue.setOutcome(totalOutcome);
        revenueRepository.save(revenue);
    }

    // API lấy danh sách revenue (cho frontend)
    public List<Revenue> getAllRevenue() {
        return revenueRepository.findAll();
    }
}