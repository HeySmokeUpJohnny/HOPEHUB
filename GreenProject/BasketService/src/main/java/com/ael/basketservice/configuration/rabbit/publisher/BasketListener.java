package com.ael.basketservice.configuration.rabbit.publisher;


import com.ael.basketservice.model.BasketStatusUpdateEvent;
import com.ael.basketservice.service.abstracts.IBasketService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class BasketListener {
    private static final Logger logger = LoggerFactory.getLogger(BasketListener.class);

    // Statik queue adı
    private static final String QUEUE_NAME = "basket.queue";

    private final IBasketService basketService;

    @RabbitListener(queues = QUEUE_NAME)
    public void handleBasketStatusUpdate(BasketStatusUpdateEvent event) {
        logger.info("Received basket status update event: {}", event);

        try {
            basketService.updateBasketStatus(event.getBasketId(), event.getNewStatus());
            logger.info("Basket status updated successfully for basketId: {} to status: {}",
                    event.getBasketId(), event.getNewStatus());
        } catch (Exception e) {
            logger.error("Failed to update basket status for basketId: {}", event.getBasketId(), e);
        }
    }
}
