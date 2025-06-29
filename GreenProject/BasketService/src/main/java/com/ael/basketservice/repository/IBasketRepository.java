package com.ael.basketservice.repository;

import com.ael.basketservice.model.Basket;
import com.ael.basketservice.model.BasketStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import java.util.Optional;


@Repository
public interface IBasketRepository extends JpaRepository<Basket, Integer> {

    @Modifying
    @Transactional
    @Query("UPDATE Basket b SET b.basketStatus.basketStatusId = 3 WHERE b.basketId = :basketId")
    void readyForCheckout(@Param("basketId") Integer basketId);


    @Query("Select  b.basketStatus from Basket b WHERE b.basketId = :basketId")
    BasketStatus getBasketStatus(@Param("basketId") Integer basketId);

    Basket findBasketByCustomerId(Integer customerId);
    Basket findBasketByBasketId(Integer basketId);
    Optional<Basket> findByCustomerIdAndBasketStatus_BasketStatusId(Integer customerId, Integer basketStatusId);
}
