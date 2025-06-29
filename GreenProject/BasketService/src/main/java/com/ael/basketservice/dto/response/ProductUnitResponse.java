package com.ael.basketservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ProductUnitResponse {
    private Integer productId;
    private Integer basketProductUnitId;
    private String productName;
    private String productDescription;
    private Integer subCategoryId;
    private String subCategoryName;
    private Double productPrice;
    private Integer productQuantity;
    private String productModel;
    private String productModelYear;
    private String productImageUrl;
}
