package com.ael.paymentservice.controller;

import com.ael.paymentservice.dto.response.CouponResponse;
import com.ael.paymentservice.model.Coupon;
import com.ael.paymentservice.service.CouponService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/coupon")
@AllArgsConstructor
public class CouponController {
    CouponService couponService;

    @GetMapping("/getCoupon/{userId}")
    public ResponseEntity< List<CouponResponse>> getCouponByUserId(@PathVariable Integer userId) {
       List<CouponResponse> coupon =  couponService.getActiveCouponByUserId(userId);
       return ResponseEntity.ok(coupon);
    }
}
