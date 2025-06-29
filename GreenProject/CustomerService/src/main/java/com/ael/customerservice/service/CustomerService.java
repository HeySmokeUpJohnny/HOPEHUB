package com.ael.customerservice.service;


import com.ael.customerservice.client.IBasketClient;
import com.ael.customerservice.dto.response.AddressResponse;
import com.ael.customerservice.dto.response.CheckoutInfoResponse;
import com.ael.customerservice.dto.response.CustomerResponse;
import com.ael.customerservice.exception.CustomerAlreadyExistsException;
import com.ael.customerservice.exception.CustomerNotFoundException;
import com.ael.customerservice.exception.WrongUserNameOrPasswordException;
import com.ael.customerservice.model.Customer;
import com.ael.customerservice.model.CustomerAddress;
import com.ael.customerservice.repository.ICustomerAddressRepository;
import com.ael.customerservice.repository.ICustomerCardRepository;
import com.ael.customerservice.repository.ICustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class CustomerService implements ICustomerService {


    ICustomerRepository customerRepository;
    ICustomerAddressRepository customerAddressRepository;
    CustomerCreditCardService customerCreditCardService;
    IBasketClient basketClient;

    @Override
    public Customer createCustomer(Customer customer) {

        existsByEmailOrUserName(customer.getEmail(), customer.getUsername());

        Customer newCustomer = Customer.builder()
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .email(customer.getEmail())
                .username(customer.getUsername())
                .password(customer.getPassword())
                .phoneNumber(customer.getPhoneNumber())
                .city(customer.getCity())
                .address(customer.getAddress())
                .build();

        customerRepository.save(newCustomer);

        return newCustomer;
    }

    @Override
    public Customer getCustomerByCustomerId(Integer customerId) {
        return null;
    }

    @Override
    public Customer getCustomerByUsername(String username) {
        return null;
    }

    @Override
    public Customer getCustomerByEmail(String email) {
        return null;
    }

    @Override
    public Boolean existsByEmailOrUserName(String email, String username) {

        return customerRepository.existsByEmailOrUsername(email, username)
                .filter(e -> !e)
                .orElseThrow(() -> new CustomerAlreadyExistsException("Bu kullanıcı zaten mevcut."));

    }

    @Override
    public Customer findCustomerById(Integer customerId) {
        return customerRepository.findById(customerId).orElseThrow(() -> new CustomerNotFoundException("Müşteri bulunamadı"));
    }

    @Override
    public Customer findCustomerByUserNameOrEmail(String email, String userName) {
        return customerRepository.findCustomerByUsernameOrEmail(userName, email).orElseThrow(() -> new CustomerNotFoundException("Müşteri bulunamadı"));
    }

    @Override
    public CustomerResponse findCustomerByUserNameAndPassword(String username, String password) {
        //İlk etapta kullanıcıyı buluyor sonra gelen kullanıcının şifresi girilen şifreyle eşleşiyor mu ona bakılıyor
        Customer foundedCustomer = customerRepository.findCustomerByUsernameOrEmail(username, null)
                .filter(customer -> customer.getPassword().equals(password))
                .orElseThrow(() -> new WrongUserNameOrPasswordException("Kullanıcı adı veya şifre hatalı."));



        return CustomerResponse.builder()
                .firstName(foundedCustomer.getFirstName())
                .lastName(foundedCustomer.getLastName())
                .email(foundedCustomer.getEmail())
                .phoneNumber(foundedCustomer.getPhoneNumber())
                .address(foundedCustomer.getAddress())
                .city(foundedCustomer.getCity())
                .customerId(foundedCustomer.getCustomerId())
                .build();
    }

    @Override
    public List<AddressResponse> getCustomerAddress(Integer customerId) {
        return customerAddressRepository.findAddressByCustomer_CustomerId(customerId)
                .stream()
                .map(address ->
                        AddressResponse.builder()
                                .AddressContent(address.getAddress())
                                .AddressId(address.getId())
                                .build())
                .collect(Collectors.toList());
    }

    @Override
    public CheckoutInfoResponse getCustomerInfoForCheckout(Integer customerId) {
        return CheckoutInfoResponse.builder()
                .addressResponse(getCustomerAddress(customerId))
                .creditCardResponses(customerCreditCardService.getAllCreditCardsByCustomerId(customerId))
                .build();
    }
}
