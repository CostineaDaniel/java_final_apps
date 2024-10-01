package com.java_shop.service;

import com.java_shop.model.Customer;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    List<Customer> getAllCustomers();

    Optional<Customer> getCustomerById(Long id);

    Customer saveCustomer(Customer customer);

    Customer updateCustomer(Customer customer);

    void deleteCustomerById(Long id);

    Optional<Customer> getCustomerByEmail(String email);

    Optional<Customer> findByEmail(String email);
}
