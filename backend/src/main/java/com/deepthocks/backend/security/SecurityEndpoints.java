package com.deepthocks.backend.security;

public class SecurityEndpoints {
    public static final String frontendURL = "http://localhost:5173";

    public static final String[] PUBLIC_GET_ENDPOINTS = {
            "/api/products",
            "/api/products/**",
            "/api/categories/{parentSlug}/{childSlug}/products",
            "/api/categories/{categorySlug}/products",
            "/api/products/search/**"
    };

    public static final String[] PUBLIC_POST_ENDPOINTS = {
            "/api/auth/register",
            "/api/auth/login"
    };

    public static final String[] ADMIN_GET_ENDPOINS = {
            "api/users",
            "api/users/**",
            "api/orders/all",
    };

    public static final String[] ADMIN_POST_ENDPOINTS = {
            "/api/products",
            "/api/products/**",
            "/api/upload/images",
            "/api/upload/images/**",
            "/api/upload/**",
    };

    public static final String[] ADMIN_DELETE_ENDPOINTS = {
            "/api/products/**",
            "/api/products/",
            "/api/products/{productId}",
    };

    public static final String[] ADMIN_PUT_ENDPOINTS = {
            "/api/products/**",
            "/api/products/",
            "/api/products/{productId}",
    };
}
