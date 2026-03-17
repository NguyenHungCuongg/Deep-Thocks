package com.deepthocks.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
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

    @Column(name = "product_description", columnDefinition = "TEXT")
    private String productDescription;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "stock_quantity")
    private int stockQuantity;

    @Version
    @Column(name = "version")
    private Long version;

    @Column(name = "base_price", precision = 19, scale = 2)
    private BigDecimal basePrice;

    @Column(name = "sale_price", precision = 19, scale = 2)
    private BigDecimal salePrice;

    @OneToMany(mappedBy = "product")
    private List<ProductImage> imageList;

    @OneToMany(mappedBy = "product")
    private List<CartItem> cartItemList;

    @OneToMany(mappedBy = "product")
    private List<OrderItem> orderItemList;
}