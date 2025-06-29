package com.ael.customerservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
@AllArgsConstructor
public class CheckoutInfoResponse {
    private List<AddressResponse> addressResponse;
    private List<CreditCardResponse> creditCardResponses;
}
