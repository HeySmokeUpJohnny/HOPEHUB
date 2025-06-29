package com.ael.basketservice.service.abstracts;

import com.ael.basketservice.dto.request.BasketRequest;
import com.ael.basketservice.model.Basket;
import com.ael.basketservice.model.BasketStatus;


public interface IBasketService {
    Basket createNewBasket(Integer customerId);
    void addProductToBasket(Integer basketId,Integer productId);
    void addProductToCustomerBasket(Integer customerId, Integer productId);
    void removeProductFromBasket(Integer productId,Integer basketId);
    Basket getBasketByCustomerId(Integer customerId);
    Basket getBasketByBasketId(Integer basketId);
    Basket getActiveBasket(Integer customerId);
    BasketStatus getBasketStatus(Integer basketId);
    void updateBasketStatus(Integer basketId, Integer newStatus);
}
