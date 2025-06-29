package com.ael.orderservice.config.rabbitmq.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetailRequest {
    private Integer customerId;
    private Integer basketId;
    private String orderAddress;
    private List<BasketItem> basketItems = new ArrayList<>();
}
