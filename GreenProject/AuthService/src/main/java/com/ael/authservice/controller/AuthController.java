package com.ael.authservice.controller;
import com.ael.authservice.dto.request.AuthContactInfo;
import com.ael.authservice.dto.response.CustomerResponse;
import com.ael.authservice.filter.JwtUtil;
import com.ael.authservice.model.AuthLoginResponse;
import com.ael.authservice.model.LoginRequest;
import com.ael.authservice.client.ICustomerClient;
import com.ael.authservice.model.Customer;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Enumeration;


@RestController
@RefreshScope
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {


    private static final Logger log = LoggerFactory.getLogger(AuthController.class);


    private AuthContactInfo authContactInfo;
    private ICustomerClient customerClient;
    private JwtUtil jwtUtil;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        log.info("Login request received for username: {}", loginRequest.getUsername());
        
        CustomerResponse customer = customerClient.authenticateCustomer(
                loginRequest.getUsername(),
                loginRequest.getPassword()
        ).getBody();

        if (customer != null) {
            log.info("Customer authenticated successfully: {}", customer.getEmail());
            
            // JWT token üret
            String token = jwtUtil.generateToken(
                    customer.getEmail(),
                    "USER",
                    customer.getCustomerId()
            );
            
            log.info("JWT token generated successfully");

            AuthLoginResponse response = AuthLoginResponse.builder()
                    .accessToken(token)
                    .userName(customer.getEmail())
                    .customerId(customer.getCustomerId())
                    .activeBasketId(customer.getActiveBasketId())
                    .build();

            ResponseCookie cookie = ResponseCookie.from("jwt", token)
                    .httpOnly(true)
                    .path("/")
                    .maxAge(60 * 60) // 1 saat
                    .domain("localhost")
                    .secure(true)
                    .sameSite("None")
                    .build();
            
            log.info("Cookie created: {}", cookie.toString());

            // Cookie'yi response header'ına ekle
            ResponseEntity<?> responseEntity = ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(response);
            
            log.info("Response created with cookie header");
            return responseEntity;
        }

        log.warn("Authentication failed for username: {}", loginRequest.getUsername());
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Customer customer) {

        customerClient.createCustomer(customer);
        return ResponseEntity.ok("Customer registered successfully!");
    }

    @GetMapping("/test")
    public ResponseEntity<?> test(HttpServletRequest request) {
        log.info("AuthContactInfo message: {}", authContactInfo != null ? authContactInfo.getMessage() : "null");

        log.info("=== ALL REQUEST HEADERS ===");
        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            String headerValue = request.getHeader(headerName);
            log.info("Header: {} = {}", headerName, headerValue);
        }


        if (authContactInfo == null || authContactInfo.getMessage() == null) {
            return ResponseEntity.status(500).body("Configuration not loaded properly");
        }
        return ResponseEntity.ok(authContactInfo.getMessage());
    }
}
