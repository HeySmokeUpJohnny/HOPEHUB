package com.ael.orderservice.repository;

import com.ael.orderservice.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IOrderStatusRepository extends JpaRepository<OrderStatus, Integer> {
    Optional<OrderStatus> findByOrderStatusName(String orderStatusName);
}
