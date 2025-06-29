package com.ael.orderservice.service;

import com.ael.orderservice.model.OrderStatus;
import com.ael.orderservice.repository.IOrderStatusRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class OrderStatusService implements IOrderStatusService {

    private final IOrderStatusRepository orderStatusRepository;

    @Override
    public OrderStatus getOrderStatusByOrderStatusId(Integer orderStatusId) {
        return orderStatusRepository.findById(orderStatusId).get();
    }
}
