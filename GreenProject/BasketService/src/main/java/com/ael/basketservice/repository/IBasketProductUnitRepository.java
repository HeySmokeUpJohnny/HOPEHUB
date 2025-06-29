package com.ael.basketservice.repository;

import com.ael.basketservice.model.BasketProductUnit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface IBasketProductUnitRepository extends JpaRepository<BasketProductUnit, Integer> {
        List<BasketProductUnit> findBasketProductUnitByBasket_BasketId(Integer basketId);
        List<BasketProductUnit> findBasketProductUnitByBasket_CustomerId (Integer customerId);
        void deleteBasketProductUnitByProductIdAndBasket_BasketId(Integer productId,Integer basketId);
        Optional<BasketProductUnit> findByBasket_BasketIdAndProductId(Integer basketId, Integer productId);
        BasketProductUnit getBasketProductUnitByBasket_BasketIdAndProductId(Integer basketId, Integer productId);
        @Query("SELECT bpu FROM BasketProductUnit bpu WHERE bpu.basket.basketId = :basketId AND bpu.productId = :productId ORDER BY bpu.basketProductUnitId DESC")
        Optional<BasketProductUnit> findFirstByBasketIdAndProductIdOrderByIdDesc(@Param("basketId") Integer basketId, @Param("productId") Integer productId);
}

