package com.deepthocks.backend.repository;

import com.deepthocks.backend.entity.Discount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountRepository extends JpaRepository<Discount, Integer> {
}
