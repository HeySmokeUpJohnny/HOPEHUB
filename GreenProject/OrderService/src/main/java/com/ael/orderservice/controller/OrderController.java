package com.ael.orderservice.controller;

import com.ael.orderservice.config.rabbitmq.model.OrderDetailRequest;
import com.ael.orderservice.dto.request.OrderRequest;
import com.ael.orderservice.model.Order;
import com.ael.orderservice.service.IOrderService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/order")
public class OrderController {

    private final IOrderService orderService;

    @PostMapping("/createOrder")
    public String createOrder(@RequestBody OrderDetailRequest orderDetailRequest) {
        orderService.createOrder(orderDetailRequest);
        return "Order created";
    }
}
