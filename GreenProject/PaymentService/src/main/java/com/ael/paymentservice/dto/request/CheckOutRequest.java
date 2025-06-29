package com.ael.paymentservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CheckOutRequest {
    private Double amount;
    private String cardNumber;
    private String cardOwnerName;
    private String cvv;
}
