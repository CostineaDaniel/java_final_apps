package com.java_shop.service.impl;


import com.java_shop.model.Customer;
import com.java_shop.repository.CustomerRepository;
import com.java_shop.service.CustomerService;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {
    private CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    @Override
    public Customer saveCustomer(Customer customer) {

        String password = BCrypt.hashpw(customer.getPassword(), BCrypt.gensalt());
        customer.setPassword(password);

        return customerRepository.save(customer);
    }

    @Override
    public Customer updateCustomer(Customer customer) {
        String password = BCrypt.hashpw(customer.getPassword(), BCrypt.gensalt());
        customer.setPassword(password);

        return customerRepository.save(customer);
    }

    @Override
    public void deleteCustomerById(Long id) {
        customerRepository.deleteById(id);
    }

    @Override
    public Optional<Customer> getCustomerByEmail(String email){
        return customerRepository.getCustomerByEmail(email);
    }

    @Override
    public Optional<Customer> findByEmail(String email){
        return customerRepository.findByEmail(email);
    }
}
