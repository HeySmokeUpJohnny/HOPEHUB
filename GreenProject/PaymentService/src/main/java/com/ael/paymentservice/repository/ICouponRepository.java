package com.ael.paymentservice.repository;


import com.ael.paymentservice.enums.CouponStatus;
import com.ael.paymentservice.enums.DonationStatus;
import com.ael.paymentservice.model.Coupon;
import com.ael.paymentservice.model.SeedDonation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ICouponRepository extends JpaRepository<Coupon, Integer> {
    List<Coupon> findByUserIdAndStatus(Integer userId, CouponStatus status);
}
