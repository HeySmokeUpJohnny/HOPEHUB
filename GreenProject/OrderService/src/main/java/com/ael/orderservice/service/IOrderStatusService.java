package com.ael.orderservice.service;

import com.ael.orderservice.model.OrderStatus;

public interface IOrderStatusService {
    OrderStatus getOrderStatusByOrderStatusId(Integer orderStatusId);
}
