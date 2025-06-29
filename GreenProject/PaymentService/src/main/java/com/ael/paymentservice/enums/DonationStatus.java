package com.ael.paymentservice.enums;



public enum DonationStatus {
    ACTIVE(1),
    DONATED(2);

    private final int statusCode;

    DonationStatus(int statusCode) {
        this.statusCode = statusCode;
    }

    public int getStatusCode() {
        return statusCode;
    }

}
