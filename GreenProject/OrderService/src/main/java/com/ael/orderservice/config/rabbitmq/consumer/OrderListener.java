package com.ael.orderservice.config.rabbitmq.consumer;

import com.ael.orderservice.config.rabbitmq.config.RabbitMQConfig;
import com.ael.orderservice.config.rabbitmq.model.OrderDetailRequest;
import com.ael.orderservice.service.IOrderService;
import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class OrderListener {
    IOrderService orderService;

    @RabbitListener(queues = RabbitMQConfig.ORDER_QUEUE)
    public void listenOrderDetailFromPaymentService(OrderDetailRequest orderDetailRequest) {

        orderService.createOrder(orderDetailRequest);
        System.out.println(orderDetailRequest);
        // iş mantığı burada
    }
}
