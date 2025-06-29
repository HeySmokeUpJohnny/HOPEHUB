package com.ael.basketservice.mapping;

import com.ael.basketservice.dto.response.ProductUnitResponse;
import com.ael.basketservice.model.BasketProductUnit;

public  class MapperToProductUnitResponse {
    public static ProductUnitResponse convertToProductUnitResponse(BasketProductUnit product) {
        return ProductUnitResponse.builder()
                .productId(product.getProductId())
                .productName(product.getProductName())
                .subCategoryId(null) // Eğer subCategoryId yoksa null olarak ayarlıyoruz
                .productPrice(product.getProductUnitPrice())
                .build();
    }
}
