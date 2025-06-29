package com.ael.customerservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="BasketService")
public interface IBasketClient {
    @GetMapping("/basket/getActiveBasketId/{customerId}")
    Integer getActiveBasketId(@PathVariable Integer customerId);
}
