package com.java_shop.service;

import com.java_shop.dto.LoginDto;
import com.java_shop.dto.RegisterDto;
import com.java_shop.model.Customer;

public interface AuthService {

    Customer logIn(LoginDto loginDto);
    Customer register(RegisterDto registerDto);
}
