package com.ael.paymentservice.controller;


import com.ael.paymentservice.dto.response.DonateResponse;
import com.ael.paymentservice.model.SeedDonation;
import com.ael.paymentservice.service.DonationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/donation")
public class DonationController {

    DonationService donationService;

    @GetMapping("/getDonation/{userId}")
    public ResponseEntity<SeedDonation> getDonation(@PathVariable Integer userId) {
        return ResponseEntity.ok(donationService.getActiveSeedDonationByUserId(userId));
    }

    @GetMapping("/toDonate/{userId}")
    public ResponseEntity<DonateResponse> toDonate(@PathVariable Integer userId) {
        return ResponseEntity.ok(donationService.toDonate(userId));
    }
}
