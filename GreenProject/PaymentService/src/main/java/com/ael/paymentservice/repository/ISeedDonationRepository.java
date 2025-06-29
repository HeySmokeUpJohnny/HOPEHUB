package com.ael.paymentservice.repository;

import com.ael.paymentservice.enums.DonationStatus;
import com.ael.paymentservice.model.SeedDonation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ISeedDonationRepository extends JpaRepository<SeedDonation, Integer> {
    Optional<SeedDonation> findByUserId(Integer userId);
    Optional<SeedDonation> findByUserIdAndStatus(Integer userId, DonationStatus status);

}
