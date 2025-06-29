package com.ael.authservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AuthLoginResponse {
    private String accessToken;
    private String userName;
    private Integer customerId;
    private Integer activeBasketId;
}
