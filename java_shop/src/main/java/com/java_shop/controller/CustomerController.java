package com.java_shop.controller;


import com.java_shop.exception.ResourceNotFoundException;
import com.java_shop.model.Customer;

import com.java_shop.service.CustomerService;
import com.java_shop.utils.ApiResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllCustomers() {
        List<Customer> customersList = customerService.getAllCustomers();

        return ResponseEntity.ok(ApiResponse.success("Customer list", customersList));
    }

    @GetMapping("/customersById/{id}")
    public ResponseEntity<ApiResponse> getAllCustomerById(@PathVariable Long id) {
        Optional<Customer> customerById = customerService.getCustomerById(id);

        customerById.orElseThrow(() ->
                new ResourceNotFoundException("The customer with id : " + id + " doesn't exist in DB"));

        return ResponseEntity.ok(ApiResponse.success("Customer by id", customerById.get()));
    }


    @PostMapping("/addCustomer")
    public ResponseEntity<ApiResponse> saveCustomer(@RequestBody Customer customer) {
        Customer customer1 = customerService.saveCustomer(customer);

        return ResponseEntity.ok(ApiResponse.success("Add customer with success", customer1));
    }

    @PutMapping("/updateCustomer")
    public ResponseEntity<ApiResponse> updateCustomer(@RequestBody Customer customer) {
        if (customer.getId() == null) {
            throw new ResourceNotFoundException("Customer id is not valid");
        }
        Optional<Customer> customerOptional = customerService.getCustomerById(customer.getId());
        customerOptional.orElseThrow(() ->
                new ResourceNotFoundException("Customer with id: " + customer.getId() + " doesn't exist in DB"));

        return ResponseEntity.ok(ApiResponse.success("Update customer with success", customerService.updateCustomer(customer)));
    }

    @DeleteMapping("/deleteCustomerById/{id}")
    public ResponseEntity<ApiResponse> deleteCustomerById(@PathVariable Long id) {
        Optional<Customer> customerOptional = customerService.getCustomerById(id);
        customerOptional.orElseThrow(() ->
                new ResourceNotFoundException("The customer with id : " + id + " doesn't exist in DB"));

        customerService.deleteCustomerById(id);

        return ResponseEntity.ok(ApiResponse.success("Customer with id: " + id + " deleted successfully", null));
    }


}
