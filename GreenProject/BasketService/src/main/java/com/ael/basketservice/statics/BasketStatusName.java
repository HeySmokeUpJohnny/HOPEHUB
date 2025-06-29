package com.ael.basketservice.statics;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
public class BasketStatusName {

    public static Integer Aktif = 1;
    public static Integer Pasif = 2;
    public static Integer Ödemeye_Hazir = 3;
    public static Integer Ödendi = 4;
    public static Integer Iptal =  5;
    public static Integer Silindi = 6;


}
