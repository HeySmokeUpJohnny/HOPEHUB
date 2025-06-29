package com.ael.paymentservice.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class CouponResponse {
    private Integer couponId;
    private String code;
    private double discountAmount;
}
