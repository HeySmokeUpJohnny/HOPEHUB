package com.ael.basketservice.client;


import com.ael.basketservice.dto.response.ProductUnitResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ProductService")
public interface ProductClient {
    @GetMapping("/product/getProductById/{productId}")
    ProductUnitResponse getProductById(@PathVariable Integer productId);
}
