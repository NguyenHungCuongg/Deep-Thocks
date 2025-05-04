package com.deepthocks.backend.repository;

import com.deepthocks.backend.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "addresses")
public interface AddressRepository extends JpaRepository<Address, Integer> {
}
