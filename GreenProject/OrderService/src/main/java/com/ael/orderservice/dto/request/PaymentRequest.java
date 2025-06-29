package com.ael.orderservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class PaymentRequest {
    private Integer paymentId;
    private Integer basketId;
    private Integer customerId;
    private Double amount;
    private String cardNumber;
}
