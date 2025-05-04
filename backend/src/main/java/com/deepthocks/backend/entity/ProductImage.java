package com.deepthocks.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.io.*;
import java.util.*;

@Entity
@Table(name = "product_images")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_image_id")
    private int productImageId;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @Column
    private String url;

    @Column(name="alt_text")
    private String altText;

    @Column(name = "display_order")
    private int displayOrder;
}