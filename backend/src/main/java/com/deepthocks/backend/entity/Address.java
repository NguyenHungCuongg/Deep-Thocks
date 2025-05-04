package com.deepthocks.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Entity
@Table(name = "addresses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Integer addressId;

    private String city;
    private String district;
    private String ward;
    private String street;

    @OneToMany(mappedBy = "address")
    private List<Order> orderList;
}
