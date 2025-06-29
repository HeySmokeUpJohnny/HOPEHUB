package com.ael.orderservice.enums;

public enum OrderStatusesEnum {
    Aktif(1, "Aktif"),
    Beklemede(2, "Beklemede"),
    Iptal(3, "İptal"),
    Kargolandi(4, "Kargolandı");

    private final Integer orderStatusId;
    private final String orderStatusName;

    OrderStatusesEnum(Integer orderStatusId, String orderStatusName) {
        this.orderStatusId = orderStatusId;
        this.orderStatusName = orderStatusName;
    }

    public Integer getOrderStatusId() {
        return orderStatusId;
    }

    public String getOrderStatusName() {
        return orderStatusName;
    }
}


