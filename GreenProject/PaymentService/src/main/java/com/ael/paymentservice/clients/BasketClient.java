package com.ael.paymentservice.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;


@FeignClient(name = "BasketService")
public interface BasketClient {

    @PutMapping("/basket/updateBasketStatus/{basketId}/{newStatus}")
    ResponseEntity<String> updateBasketStatus(@PathVariable Integer basketId, @PathVariable Integer newStatus);
}