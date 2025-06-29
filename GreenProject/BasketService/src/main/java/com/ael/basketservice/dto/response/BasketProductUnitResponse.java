package com.ael.basketservice.dto.response;

import com.ael.basketservice.model.BasketProductUnit;
import com.ael.basketservice.model.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class BasketProductUnitResponse {
    private Integer basketId;
    private List<ProductUnitResponse> basketProducts;
}
