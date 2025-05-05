package com.deepthocks.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private int categoryId;

    @Column(name = "category_name")
    private String categoryName;

    @Column(name = "category_description")
    private String categoryDescription;

    @OneToMany(mappedBy = "category")
    private List<Product> productList;

    //Thêm danh sách category cha
    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Category parentCategory;

    //Thêm danh sách category con
    @OneToMany(mappedBy = "parentCategory")
    private List<Category> childrenCategories = new ArrayList<>();
}
