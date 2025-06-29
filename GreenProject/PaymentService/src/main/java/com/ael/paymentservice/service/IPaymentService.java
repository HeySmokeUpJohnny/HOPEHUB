package com.ael.paymentservice.service;

import com.ael.paymentservice.dto.request.PaymentRequest;
import com.ael.paymentservice.dto.response.PaymentResponse;


public interface IPaymentService {
    PaymentResponse createPayment(PaymentRequest paymentRequest);
}
