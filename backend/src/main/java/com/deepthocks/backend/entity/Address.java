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
    private int addressId;

    @Column
    private String city;

    @Column
    private String district;

    @Column
    private String ward;

    @Column
    private String street;

    @OneToMany(mappedBy = "address")
    private List<Order> orderList;
}
