package com.ael.paymentservice.config.rabbitmq.model;

import com.ael.paymentservice.dto.request.BasketItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetail {
    private Integer customerId;
    private Integer basketId;
    private String  orderAddress;
    private List<BasketItem> basketItems = new ArrayList<>();
}
