package com.ael.basketservice.controller;


import com.ael.basketservice.configuration.rabbit.consumer.BasketProducer;
import com.ael.basketservice.dto.request.BasketRequest;
import com.ael.basketservice.dto.response.BasketProductUnitResponse;
import com.ael.basketservice.dto.response.BasketResponse;
import com.ael.basketservice.dto.response.ProductUnitResponse;
import com.ael.basketservice.model.Basket;
import com.ael.basketservice.model.BasketProductUnit;
import com.ael.basketservice.model.BasketStatus;
import com.ael.basketservice.service.abstracts.IBasketProductUnitService;
import com.ael.basketservice.service.abstracts.IBasketService;
import com.ael.basketservice.service.impl.BasketService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;

@RestController
@RequestMapping("/basket")
@AllArgsConstructor
public class BasketController {

    private static final Logger log = LoggerFactory.getLogger(BasketController.class);

    IBasketService basketService;
    BasketProducer basketProducer;
    IBasketProductUnitService basketProductUnitService;


    @GetMapping("/addProductToBasket/{basketId}/{productId}")
    public String addProductToBasket(HttpServletRequest request,@PathVariable Integer basketId, @PathVariable Integer productId){
        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            String headerValue = request.getHeader(headerName);
            log.info("Header: {} = {}", headerName, headerValue);
        }

        basketService.addProductToBasket(basketId,productId);
        return "success";
    }

    @GetMapping("/addProductToCustomerBasket/{customerId}/{productId}")
    public ResponseEntity<String> addProductToCustomerBasket(@PathVariable Integer customerId, @PathVariable Integer productId) {
        log.info("Adding product {} to customer {} active basket", productId, customerId);

        try {
            basketService.addProductToCustomerBasket(customerId, productId);
            return ResponseEntity.ok("Product successfully added to customer " + customerId + " active basket");
        } catch (Exception e) {
            log.error("Error adding product to customer basket: {}", e.getMessage());
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/basketProductListing/{customerId}")
    public ResponseEntity<BasketProductUnitResponse> basketProductListing(@PathVariable Integer customerId) {
        log.info("Listing basket products for customer ID: {}", customerId);

        try {
            BasketProductUnitResponse response = basketProductUnitService.basketProductListing(customerId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error listing basket products: {}", e.getMessage());
            return ResponseEntity.ok(BasketProductUnitResponse.builder()
                    .basketProducts(new ArrayList<>())
                    .basketId(null)
                    .build());
        }
    }

    // Yeni endpoint: Müşterinin aktif sepetini getir
    @GetMapping("/getActiveBasket/{customerId}")
    public ResponseEntity<Basket> getActiveBasket(@PathVariable Integer customerId) {
        log.info("Getting active basket for customer: {}", customerId);

        try {
            Basket basket = basketService.getActiveBasket(customerId);
            return ResponseEntity.ok(basket);
        } catch (Exception e) {
            log.error("Error getting active basket: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/getMyActiveBasket/{customerId}")
    public ResponseEntity<BasketProductUnitResponse> getMyActiveBasket(@PathVariable Integer customerId) {
        log.info("Getting active basket contents for customer ID: {}", customerId);

        try {
            BasketProductUnitResponse response = basketProductUnitService.getActiveBasketProductUnitsByCustomerId(customerId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error getting active basket contents: {}", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/removeProductFromBasket/{basketId}/{productId}")
    public String removeProductFromBasket(@PathVariable Integer basketId,@PathVariable Integer productId){
        basketService.removeProductFromBasket(productId,basketId);
        return "success";
    }

    @GetMapping("/getBasketProductUnitByBasketId/{basketId}")
    public ResponseEntity<BasketProductUnitResponse> getBasketProductUnitByBasketId(@PathVariable Integer basketId){
        return ResponseEntity.ok(basketProductUnitService.getBasketProductUnitByBasketId(basketId));
    }

    @GetMapping("/getBasketProductUnitByCustomerId/{customerId}")
    public ResponseEntity<BasketProductUnitResponse> getBasketProductUnitByCustomerId(@PathVariable Integer customerId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ResponseEntity.ok(basketProductUnitService.getBasketProductUnitByCustomerId(customerId));
    }

    @GetMapping("/getBasketStatus/{basketId}")
    public ResponseEntity<BasketStatus> getBasketStatus(@PathVariable Integer basketId){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return ResponseEntity.ok(basketService.getBasketStatus(basketId));
    }

    @PutMapping("/incrementProductQuantity/{basketProductUnitId}")
    public ResponseEntity<String> incrementProductQuantity(@PathVariable Integer basketProductUnitId)
    {
        basketProductUnitService.incrementProductQuantity(basketProductUnitId);
        return ResponseEntity.ok("Success");
    }

    @PutMapping("/decrementProductQuantity/{basketProductUnitId}")
    public ResponseEntity<String> decrementProductQuantity(@PathVariable Integer basketProductUnitId)
    {
        basketProductUnitService.decrementProductQuantity(basketProductUnitId);
        return ResponseEntity.ok("Success");
    }
}
