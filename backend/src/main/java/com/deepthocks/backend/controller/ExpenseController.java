package com.deepthocks.backend.controller;

import com.deepthocks.backend.entity.Expense;
import com.deepthocks.backend.service.ExpenseService;
import com.deepthocks.backend.service.RevenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private RevenueService revenueService;

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        Expense savedExpense = expenseService.addExpense(expense);
        revenueService.updateOutcome(expense.getExpenseMonth(), expense.getExpenseYear());
        return savedExpense;
    }

    @PutMapping("/{id}")
    public Expense updateExpense(@PathVariable int id, @RequestBody Expense expense) {
        Expense updatedExpense = expenseService.updateExpense(id, expense);
        revenueService.updateOutcome(expense.getExpenseMonth(), expense.getExpenseYear());
        return updatedExpense;
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable int id) {
        // Lấy thông tin tháng/năm trước khi xóa để cập nhật revenue
        Expense expense = expenseService.getAllExpenses().stream()
                .filter(e -> e.getExpenseId() == id)
                .findFirst().orElse(null);
        if (expense != null) {
            expenseService.deleteExpense(id);
            revenueService.updateOutcome(expense.getExpenseMonth(), expense.getExpenseYear());
        }
    }
}