package com.ael.productservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ProductUnitResponse {
    private Integer productId;
    private String productName;
    private String productDescription;
    private Integer subCategoryId;
    private String subCategoryName;
    private String categoryName;
    private Double productPrice;
    private String productImageUrl;
}
