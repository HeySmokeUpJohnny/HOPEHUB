package com.ael.customerservice.controller;

import com.ael.customerservice.client.IBasketClient;
import com.ael.customerservice.dto.response.AddressResponse;
import com.ael.customerservice.dto.response.CheckoutInfoResponse;
import com.ael.customerservice.dto.response.CreditCardResponse;
import com.ael.customerservice.dto.response.CustomerResponse;
import com.ael.customerservice.model.Customer;
import com.ael.customerservice.model.CustomerCreditCard;
import com.ael.customerservice.service.ICustomerCreditCardService;
import com.ael.customerservice.service.ICustomerService;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
@AllArgsConstructor
public class CustomerController {

    ICustomerService customerService;
    ICustomerCreditCardService customerCreditCardService;
    IBasketClient basketClient;


    @PostMapping("/createCustomer")
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        return ResponseEntity.ok(customerService.createCustomer(customer));
    }

    @GetMapping("/getCustomer/{customerId}")
    public ResponseEntity<Customer> getCustomer(@PathVariable("customerId") Integer customerId) {
        return ResponseEntity.ok(customerService.findCustomerById(customerId));
    }

    @PostMapping("/authenticateCustomer")
    public ResponseEntity<CustomerResponse> authenticateCustomer(@RequestParam String username, @RequestParam String password) {
        return ResponseEntity.ok(customerService.findCustomerByUserNameAndPassword(username, password));
    }

    @GetMapping("/customerCreditCards/{customerId}")
    public ResponseEntity<List<CreditCardResponse>> getCustomerCreditCards(@PathVariable Integer customerId) {
        return ResponseEntity.ok(customerCreditCardService.getAllCreditCardsByCustomerId(customerId));
    }

    @GetMapping("/getCustomerAddress/{customerId}")
    public ResponseEntity<List<AddressResponse>> getCustomerAddress(@PathVariable Integer customerId) {
        return ResponseEntity.ok(customerService.getCustomerAddress(customerId));
    }

    @GetMapping("/getCustomerInfoForCheckOut/{customerId}")
    public ResponseEntity<CheckoutInfoResponse> getCustomerInfoForCheckOut(@PathVariable Integer customerId) {
        return ResponseEntity.ok(customerService.getCustomerInfoForCheckout(customerId));
    }

    @GetMapping("/getAllCustomerInfoByCustomerId/{customerId}")
    public ResponseEntity<CustomerResponse> getAllCustomerInfo(@PathVariable Integer customerId) {
        Customer customer = customerService.findCustomerById(customerId);
        Integer basketId = basketClient.getActiveBasketId(customerId);

        CustomerResponse customerResponse = CustomerResponse.builder()
                .firstName(customer.getFirstName())
                .lastName(customer.getLastName())
                .email(customer.getEmail())
                .phoneNumber(customer.getPhoneNumber())
                .address(customer.getAddress())
                .city(customer.getCity())
                .customerId(customer.getCustomerId())
                .activeBasketId(basketId)
                .build();

         return ResponseEntity.ok(customerResponse);


    }

}
