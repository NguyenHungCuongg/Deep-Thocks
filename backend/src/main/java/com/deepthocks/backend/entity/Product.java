package com.deepthocks.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private int productId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "product_description")
    private String productDescription;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "stock_quantity")
    private int stockQuantity;

    @Column(name = "base_price")
    private double basePrice;

    @Column(name = "sale_price")
    private double salePrice;

    @OneToMany(mappedBy = "product")
    private List<ProductImage> imageList;

    @OneToMany(mappedBy = "product")
    private List<CartItem> cartItemList;

    @OneToMany(mappedBy = "product")
    private List<OrderItem> orderItemList;
}