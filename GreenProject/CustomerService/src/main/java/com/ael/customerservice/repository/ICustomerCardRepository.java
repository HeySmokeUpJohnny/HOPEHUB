package com.ael.customerservice.repository;

import com.ael.customerservice.model.CustomerCreditCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICustomerCardRepository extends JpaRepository<CustomerCreditCard,Integer> {

    List<CustomerCreditCard> findByCustomer_CustomerId(Integer customerId);

}
