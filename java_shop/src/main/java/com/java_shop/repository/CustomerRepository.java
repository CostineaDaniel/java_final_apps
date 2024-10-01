package com.java_shop.repository;


import com.java_shop.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> getCustomerByEmail(String email);


    Optional<Customer> findByEmail(String email);
}
