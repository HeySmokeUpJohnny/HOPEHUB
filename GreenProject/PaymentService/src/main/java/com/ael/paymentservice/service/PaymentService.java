package com.ael.paymentservice.service;

import com.ael.paymentservice.config.rabbitmq.model.BasketStatusUpdateEvent;
import com.ael.paymentservice.config.rabbitmq.model.OrderDetail;
import com.ael.paymentservice.config.rabbitmq.producer.PaymentEventPublisher;
import com.ael.paymentservice.dto.request.PaymentRequest;
import com.ael.paymentservice.dto.response.PaymentResponse;
import com.ael.paymentservice.enums.DonationStatus;
import com.ael.paymentservice.model.Coupon;
import com.ael.paymentservice.model.Payment;
import com.ael.paymentservice.model.SeedDonation;
import com.ael.paymentservice.repository.IPaymentRepository;
import com.ael.paymentservice.repository.ISeedDonationRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class PaymentService implements IPaymentService {

    private final PaymentEventPublisher publisher;
    IPaymentRepository paymentRepository;
    DonationService donationService;
    CouponService couponService;


    @Override
    @Transactional
    public PaymentResponse createPayment(PaymentRequest paymentRequest) {

        Payment newPayment = Payment.builder()
                .amount(paymentRequest.getCheckOutRequest()
                        .getAmount()).customerId(paymentRequest.getCustomerId())
                .cardNumber(paymentRequest.getCheckOutRequest().getCardNumber())
                .basketId(paymentRequest.getBasketId()).build();


        /*DONATION EKLEME */
        paymentRepository.save(newPayment);
        if(paymentRequest.getCouponId()!=null && paymentRequest.getCouponCode()!=null){
            couponService.changeStatusToUsed(paymentRequest.getCouponId());
        }
        else{
            paymentRequest.setCouponCode("");
        }



        /*DONATION EKLEME */

        OrderDetail orderDetail = OrderDetail.builder()
                .orderAddress(paymentRequest.getAddress())
                .basketItems(paymentRequest.getBasketItems())
                .basketId(paymentRequest.getBasketId())
                .customerId(paymentRequest.getCustomerId())
                .build();


        publisher.sendOrderDetails(orderDetail);


        BasketStatusUpdateEvent basketStatusUpdateEvent = BasketStatusUpdateEvent.builder()
                .basketId(paymentRequest.getBasketId())
                .customerId(paymentRequest.getCustomerId())
                .newStatus(4) // Ödendi
                .paymentId(newPayment.getPaymentId().toString())
                .message("Payment completed successfully")
                .build();

        publisher.sendBasketStatusUpdate(basketStatusUpdateEvent);

        return PaymentResponse.builder()
                .responseCode("00")
                .responseMessage("Success")
                .couponCode(paymentRequest.getCouponCode())
                .build();
    }


}
