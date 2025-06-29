package com.ael.orderservice.service;


import com.ael.orderservice.config.rabbitmq.model.OrderDetailRequest;
import com.ael.orderservice.dto.request.OrderRequest;
import com.ael.orderservice.model.Order;
import com.ael.orderservice.model.OrderDetail;

public interface IOrderService {
    void createOrder(OrderDetailRequest orderRequest);
}
