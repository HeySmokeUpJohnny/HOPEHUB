package com.ael.paymentservice.dto.response;

import com.ael.paymentservice.model.SeedDonation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DonateResponse {
    private SeedDonation seedDonation;
    private String couponCode;
}
