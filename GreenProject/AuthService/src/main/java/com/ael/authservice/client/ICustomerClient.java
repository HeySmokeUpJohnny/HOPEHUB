package com.ael.authservice.client;


import com.ael.authservice.dto.response.CustomerResponse;
import com.ael.authservice.model.Customer;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@FeignClient(name="CustomerService")
public interface ICustomerClient {

    @PostMapping("/customer/createCustomer")
    ResponseEntity<Customer> createCustomer(@RequestBody Customer customer);

    @GetMapping("/customer/getCustomer/{customerId}")
    ResponseEntity<Customer> getCustomer(@PathVariable("customerId") Integer customerId);

    @PostMapping("/customer/authenticateCustomer")
    ResponseEntity<CustomerResponse> authenticateCustomer(@RequestParam String username, @RequestParam String password);

    @GetMapping("/customer/getAllCustomerInfoByCustomerId/{customerId}")
    public ResponseEntity<CustomerResponse> getAllCustomerInfo(@PathVariable Integer customerId);
}
