package com.ael.customerservice.service;

import com.ael.customerservice.dto.response.AddressResponse;
import com.ael.customerservice.dto.response.CheckoutInfoResponse;
import com.ael.customerservice.dto.response.CustomerResponse;
import com.ael.customerservice.model.Customer;
import com.ael.customerservice.model.CustomerAddress;

import java.util.List;
import java.util.Optional;

public interface ICustomerService {
    Customer createCustomer(Customer customer);
    Customer getCustomerByCustomerId(Integer customerId);
    Customer getCustomerByUsername(String username);
    Customer getCustomerByEmail(String email);
    Boolean existsByEmailOrUserName(String email, String userName);
    Customer findCustomerById(Integer customerId);
    Customer findCustomerByUserNameOrEmail(String email, String userName);
    CustomerResponse findCustomerByUserNameAndPassword(String username, String password);
    List<AddressResponse> getCustomerAddress(Integer customerId);
    CheckoutInfoResponse getCustomerInfoForCheckout(Integer customerId);

}
