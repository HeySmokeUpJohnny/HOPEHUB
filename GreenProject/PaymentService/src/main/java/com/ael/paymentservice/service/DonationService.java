package com.ael.paymentservice.service;


import com.ael.paymentservice.dto.response.DonateResponse;
import com.ael.paymentservice.enums.CouponStatus;
import com.ael.paymentservice.enums.DonationStatus;
import com.ael.paymentservice.model.Coupon;
import com.ael.paymentservice.model.Payment;
import com.ael.paymentservice.model.SeedDonation;
import com.ael.paymentservice.repository.ICouponRepository;
import com.ael.paymentservice.repository.ISeedDonationRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class DonationService {

    ISeedDonationRepository seedDonationRepository;
    ICouponRepository couponRepository;


    public SeedDonation createSeedDonation(Integer userId) {
        SeedDonation seedDonation = SeedDonation.builder().count(1).userId(userId).status(DonationStatus.ACTIVE).build();
        seedDonationRepository.save(seedDonation);
        return seedDonation;
    }

    public SeedDonation getSeedDonationById(Integer id) {
        return seedDonationRepository.findById(id).orElse(null);
    }

    public SeedDonation counterSeedDonationById(Integer id) {
        SeedDonation seedDonation = seedDonationRepository.findById(id).orElse(null);
        seedDonation.setCount(seedDonation.getCount() + 1);
        return seedDonation;
    }

    public SeedDonation getActiveSeedDonationByUserId(Integer userId) {
        SeedDonation donation =  seedDonationRepository.findByUserIdAndStatus(userId, DonationStatus.ACTIVE).orElse(null);
        if(donation == null) {
            createSeedDonation(userId);
        }
        return donation;

    }

    public void incrementSeedDonationById(Integer id) {
        SeedDonation seedDonation = seedDonationRepository.findById(id).orElse(null);
        seedDonation.setCount(seedDonation.getCount() + 1);
        seedDonationRepository.save(seedDonation);
    }

    public void changeSeedDonationStatus(Integer donationId) {
        SeedDonation seedDonation = seedDonationRepository.findById(donationId).orElse(null);
        if (seedDonation != null) {
            if (seedDonation.getStatus().equals(DonationStatus.ACTIVE)) {
                seedDonation.setStatus(DonationStatus.DONATED);
            }
        }
    }


    public DonateResponse toDonate(Integer customerId) {
        SeedDonation donation = getActiveSeedDonationByUserId(customerId);
        if (donation != null) {

            if (donation.getCount() < 10) {
                incrementSeedDonationById(donation.getId());
                if (donation.getCount() == 10) {
                    changeSeedDonationStatus(donation.getId());
                    Coupon coupon = Coupon.builder()
                            .couponCode("DISCOUNT")
                            .status(CouponStatus.ACTIVE)
                            .userId(customerId)
                            .couponDescription("DISCOUNT FOR DONATE")
                            .couponName("SEED DONATE")
                            .couponPrice(5000.0)
                            .seedDonation(donation).build();
                    couponRepository.save(coupon);
                    return DonateResponse.builder().seedDonation(donation).couponCode(coupon.getCouponCode()).build();
                }
            }


        }
        return DonateResponse.builder().seedDonation(donation).couponCode("").build();
    }


}
