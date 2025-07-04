package com.deepthocks.backend.repository;

import com.deepthocks.backend.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import java.util.List;

@RepositoryRestResource(path = "expenses")
public interface ExpenseRepository extends JpaRepository<Expense, Integer> {
    List<Expense> findByExpenseMonthAndExpenseYear(int month, int year);
}