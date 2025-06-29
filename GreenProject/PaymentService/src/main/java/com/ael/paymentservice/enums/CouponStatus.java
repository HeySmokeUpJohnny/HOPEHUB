package com.ael.paymentservice.enums;

public enum CouponStatus {

    ACTIVE(1),

    USED(2),

    CANCELED(3);

    private final int couponStatusCode;

    CouponStatus(int couponStatusCode) {
        this.couponStatusCode = couponStatusCode;
    }
    public int getCouponStatusCode() {
        return couponStatusCode;
    }



}
