package com.ael.paymentservice.model;


import com.ael.paymentservice.enums.CouponStatus;
import com.ael.paymentservice.enums.DonationStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Coupons")
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer couponId;
    private String couponCode;
    private String couponName;
    private String couponDescription;
    private Double couponPrice;

    private Integer userId;

    @Enumerated(EnumType.STRING)
    private CouponStatus status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "donation_id", referencedColumnName = "Id")
    private SeedDonation seedDonation;



}
