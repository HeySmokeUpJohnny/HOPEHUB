package com.ael.paymentservice.model;


import com.ael.paymentservice.enums.DonationStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="SeedDonations")
public class SeedDonation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    private Integer userId;

    private Integer count;


    @Enumerated(EnumType.STRING)
    private DonationStatus status;




}
