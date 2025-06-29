package com.ael.basketservice.configuration.rabbit.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {
    // Statik değerler
    private static final String BASKET_QUEUE = "basket.queue";
    private static final String BASKET_EXCHANGE = "basket.exchange";
    private static final String BASKET_ROUTING_KEY = "basket.routingKey";

    @Bean
    public Queue googleAdsQueue(){
        return new Queue(BASKET_QUEUE);
    }

    @Bean
    public TopicExchange googleAdsExchange(){
        return new TopicExchange(BASKET_EXCHANGE);
    }

    @Bean
    public Binding binding(){
        return BindingBuilder
                .bind(googleAdsQueue())
                .to(googleAdsExchange())
                .with(BASKET_ROUTING_KEY);
    }

    @Bean
    public MessageConverter messageConverter(){
        return new Jackson2JsonMessageConverter();
    }

    public AmqpTemplate amqpTemplate(ConnectionFactory connectionFactory){
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(messageConverter());
        return rabbitTemplate;
    }
}
