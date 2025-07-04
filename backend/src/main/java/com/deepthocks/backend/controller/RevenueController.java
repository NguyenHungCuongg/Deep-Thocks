package com.deepthocks.backend.controller;

import com.deepthocks.backend.entity.Revenue;
import com.deepthocks.backend.service.RevenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/revenue")
public class RevenueController {
    @Autowired
    private RevenueService revenueService;

    @GetMapping
    public List<Revenue> getAllRevenue() {
        return revenueService.getAllRevenue();
    }
}