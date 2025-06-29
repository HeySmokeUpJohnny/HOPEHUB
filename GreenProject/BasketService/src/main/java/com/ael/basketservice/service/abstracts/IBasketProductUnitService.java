package com.ael.basketservice.service.abstracts;

import com.ael.basketservice.dto.response.BasketProductUnitResponse;
import com.ael.basketservice.dto.response.ProductUnitResponse;
import com.ael.basketservice.model.BasketProductUnit;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IBasketProductUnitService {
    void addBasketProductUnit(BasketProductUnit basketProductUnit);

    BasketProductUnitResponse getBasketProductUnitByBasketId(Integer basketId);

    BasketProductUnitResponse getBasketProductUnitByCustomerId(Integer customerId);

    BasketProductUnitResponse basketProductListing(Integer customerId);

    BasketProductUnitResponse getActiveBasketProductUnitsByCustomerId(Integer customerId);

    void incrementProductQuantity(Integer basketProductUnitId);

    void decrementProductQuantity(Integer basketProductUnitId);

}