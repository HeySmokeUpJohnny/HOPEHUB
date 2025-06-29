package com.ael.paymentservice.config.rabbitmq.producer;

import com.ael.paymentservice.config.rabbitmq.config.RabbitMQConfig;
import com.ael.paymentservice.config.rabbitmq.model.BasketStatusUpdateEvent;
import com.ael.paymentservice.config.rabbitmq.model.OrderDetail;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class PaymentEventPublisher {
    private final RabbitTemplate rabbitTemplate;

    public PaymentEventPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendOrderDetails(OrderDetail orderDetail) {
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.ORDER_EXCHANGE,
                RabbitMQConfig.ORDER_ROUTING_KEY,
                orderDetail
        );
    }

    public void sendBasketStatusUpdate(BasketStatusUpdateEvent basketStatusUpdateEvent) {
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.BASKET_EXCHANGE,
                RabbitMQConfig.BASKET_ROUTING_KEY,
                basketStatusUpdateEvent
        );
    }


}
