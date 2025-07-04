package com.deepthocks.backend.service;

import com.deepthocks.backend.entity.Expense;
import com.deepthocks.backend.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;

@Service
public class ExpenseService {
    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private RevenueService revenueService;

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @Transactional
    public Expense addExpense(Expense expense) {
        Expense savedExpense = expenseRepository.save(expense);
        revenueService.updateOutcome(expense.getExpenseMonth(), expense.getExpenseYear());
        return savedExpense;
    }

    @Transactional
    public Expense updateExpense(int id, Expense expense) {
        expense.setExpenseId(id);
        Expense updatedExpense = expenseRepository.save(expense);
        revenueService.updateOutcome(expense.getExpenseMonth(), expense.getExpenseYear());
        return updatedExpense;
    }

    @Transactional
    public void deleteExpense(int id) {
        Expense expense = expenseRepository.findById(id).orElse(null);
        if (expense != null) {
            int month = expense.getExpenseMonth();
            int year = expense.getExpenseYear();
            expenseRepository.deleteById(id);
            revenueService.updateOutcome(month, year);
        }
    }
}