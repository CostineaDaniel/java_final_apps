package com.java_shop.controller;

import com.java_shop.dto.LoginDto;
import com.java_shop.dto.RegisterDto;
import com.java_shop.exception.BadRequestException;
import com.java_shop.exception.InternalServerErrorException;
import com.java_shop.model.Customer;
import com.java_shop.service.AuthService;
import com.java_shop.utils.ApiResponse;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(HttpServletRequest request, @RequestBody LoginDto loginDto) {
        Customer customer = this.authService.logIn(loginDto);

        HttpSession session = request.getSession(true);  // Creează o sesiune dacă nu există
        session.setAttribute("user", loginDto.getEmail());  // Salvează datele utilizatorului în sesiune

        return ResponseEntity.ok(ApiResponse.success("Logare cu succes !", customer));

    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody RegisterDto registerDto) {

        try {
            Customer customer = this.authService.register(registerDto);
            return ResponseEntity.ok(ApiResponse.success("Registration succesfull",customer));
        }
        catch (BadRequestException e){
            return ResponseEntity.badRequest().body(ApiResponse.error(HttpStatus.BAD_REQUEST.value(), e.getMessage()));

        }

    }
}
