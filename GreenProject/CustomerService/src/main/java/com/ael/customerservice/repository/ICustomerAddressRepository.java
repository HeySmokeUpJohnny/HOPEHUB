package com.ael.customerservice.repository;

import com.ael.customerservice.dto.response.AddressResponse;
import com.ael.customerservice.model.CustomerAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ICustomerAddressRepository extends JpaRepository<CustomerAddress, Integer> {

    List<CustomerAddress> findAddressByCustomer_CustomerId(Integer customerId);

}
