package com.ael.paymentservice.dto.request;


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
public class PaymentRequest {
    private Integer customerId;
    private String Email;
    private String phone;
    private String address;
    private Integer basketId;
    private CheckOutRequest checkOutRequest;
    private Integer couponId;
    private String couponCode;
    private List<BasketItem> basketItems = new ArrayList<>();
}
