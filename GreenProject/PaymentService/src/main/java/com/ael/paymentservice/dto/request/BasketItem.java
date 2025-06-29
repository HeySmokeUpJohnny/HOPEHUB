package com.ael.paymentservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BasketItem {
    private String productId;
    private String productName;
    private String productDescription;
    private String productPrice;
    private String productQuantity;
    private String subCategoryName;
}
