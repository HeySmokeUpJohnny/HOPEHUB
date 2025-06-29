package com.ael.basketservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BasketStatusUpdateEvent {
    private Integer basketId;
    private Integer customerId;
    private Integer newStatus;
    private String paymentId;
    private String message;
}