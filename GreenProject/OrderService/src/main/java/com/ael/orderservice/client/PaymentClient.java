package com.ael.orderservice.client;


import com.ael.orderservice.dto.request.PaymentRequest;
import com.ael.orderservice.dto.response.PaymentResponseMessage;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "PaymentService")
public interface PaymentClient {
    @PostMapping("/payment/createPayment")
    ResponseEntity<PaymentResponseMessage> createPayment(@RequestBody PaymentRequest paymentRequest);

}
