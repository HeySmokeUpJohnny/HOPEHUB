package com.ael.basketservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BasketRequest {
    private Integer productId;
    private Integer basketId;
    private Integer quantity;
    private Integer customerId;
}
