package com.ael.customerservice.service;

import com.ael.customerservice.dto.response.CreditCardResponse;
import com.ael.customerservice.model.CustomerCreditCard;

import java.util.List;

public interface  ICustomerCreditCardService  {
    boolean addCreditCard(CustomerCreditCard customerCreditCard);
    List<CreditCardResponse> getAllCreditCardsByCustomerId(Integer customerId);
}
