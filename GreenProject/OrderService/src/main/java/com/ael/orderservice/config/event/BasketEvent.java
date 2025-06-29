package com.ael.orderservice.config.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class BasketEvent {
    private Integer basketId;
}
