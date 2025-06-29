package com.ael.customerservice.service;


import com.ael.customerservice.dto.response.CreditCardResponse;
import com.ael.customerservice.model.CustomerCreditCard;
import com.ael.customerservice.repository.ICustomerCardRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CustomerCreditCardService implements ICustomerCreditCardService {

    ICustomerCardRepository customerCardRepository;

    @Override
    public boolean addCreditCard(CustomerCreditCard customerCreditCard) {
        customerCardRepository.save(customerCreditCard);
        return true;
    }

    @Override
    public List<CreditCardResponse> getAllCreditCardsByCustomerId(Integer customerId) {
        return customerCardRepository.findByCustomer_CustomerId(customerId).stream().map(customerCreditCard -> CreditCardResponse.builder().cardNumber(customerCreditCard.getCardNumber()).cvv(customerCreditCard.getCVV()).expiryDate(customerCreditCard.getExpiryDate()).build()).collect(Collectors.toList());

    }

}
