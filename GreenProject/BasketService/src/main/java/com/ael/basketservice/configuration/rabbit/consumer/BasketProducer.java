package com.ael.basketservice.configuration.rabbit.consumer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.ael.basketservice.configuration.event.BasketEvent;
import com.ael.basketservice.dto.response.BasketResponse;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class BasketProducer {

    private Logger LOGGER =  LoggerFactory.getLogger(BasketProducer.class);

    // Statik değerler
    private static final String EXCHANGE = "basket.exchange";
    private static final String ROUTING_KEY = "basket.routingKey";

    private RabbitTemplate rabbitTemplate;

    public BasketProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void send(BasketEvent basketEvent) {
        LOGGER.info("Sending event: {}", basketEvent.toString());
        rabbitTemplate.convertAndSend(EXCHANGE, ROUTING_KEY, basketEvent);
    }
}
