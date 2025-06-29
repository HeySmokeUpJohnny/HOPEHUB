package com.ael.gatewayserver.controller;

import com.ael.gatewayserver.util.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    private static final Logger logger = LoggerFactory.getLogger(TestController.class);

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/jwt-status")
    public String getJwtStatus() {
        if (jwtUtil == null) {
            logger.error("JwtUtil is null in TestController");
            return "ERROR: JwtUtil is null - Dependency injection failed";
        }
        
        logger.info("JwtUtil is properly injected in TestController");
        return "SUCCESS: JwtUtil is properly injected and available";
    }
} 