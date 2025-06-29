package com.ael.orderservice.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderRequest {
    private Integer orderId;
    private Integer customerId;
    private Integer basketId;
    private String orderAddress;

}
