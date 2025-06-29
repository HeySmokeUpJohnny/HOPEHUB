package com.ael.paymentservice.controller;

import com.ael.paymentservice.config.rabbitmq.producer.PaymentEventPublisher;
import com.ael.paymentservice.dto.request.PaymentRequest;
import com.ael.paymentservice.dto.response.PaymentResponse;
import com.ael.paymentservice.service.IPaymentService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/payment")
public class PaymentController {

    private final PaymentEventPublisher publisher;
    IPaymentService paymentService;

    @PostMapping("/createPayment")
    public ResponseEntity<PaymentResponse> createPayment(@RequestBody PaymentRequest paymentRequest, HttpSession session)
    {

        PaymentResponse paymentResponseMessage = paymentService.createPayment(paymentRequest);
        return ResponseEntity.ok().body(paymentResponseMessage);
    }


}
