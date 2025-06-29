package com.ael.basketservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    private Integer productId;
    private Integer categoryId;
    private String subCategoryName;
    private Double productPrice;
    private String productName;
    private String productModel;
    private String productModelYear;
    private String productDescription;
    private Integer productQuantity;
    private String productImageUrl;
}
