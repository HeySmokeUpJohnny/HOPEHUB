package com.ael.orderservice.config.rabbitmq.publisher;

import com.ael.orderservice.config.event.BasketEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;

public class OrderConsumer {

    private Logger LOGGER = LoggerFactory.getLogger(OrderConsumer.class);

        @RabbitListener(queues = "${rabbitmq.queue.googleAds.name}")
        public void consume(BasketEvent basketEvent) {
                LOGGER.info("Received message: {}", basketEvent.toString());

        }

}
