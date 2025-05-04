package com.deepthocks.backend.repository;

import com.deepthocks.backend.entity.Discount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "discounts")
public interface DiscountRepository extends JpaRepository<Discount, Integer> {
}
