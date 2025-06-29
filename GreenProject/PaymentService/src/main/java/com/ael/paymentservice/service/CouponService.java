package com.ael.paymentservice.service;

import com.ael.paymentservice.dto.response.CouponResponse;
import com.ael.paymentservice.enums.CouponStatus;
import com.ael.paymentservice.model.Coupon;
import com.ael.paymentservice.repository.ICouponRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class CouponService {
    ICouponRepository couponRepository;


    public List<CouponResponse> getActiveCouponByUserId(Integer userId){

        List<Coupon> activeCoupons = couponRepository.findByUserIdAndStatus(userId, CouponStatus.ACTIVE);

        if (activeCoupons.isEmpty()) {
            throw new RuntimeException("Bu kullanıcıya ait aktif kupon bulunamadı");
        }


        return activeCoupons.stream()
                .map(coupon -> CouponResponse.builder()
                        .code(coupon.getCouponCode())
                        .couponId(coupon.getCouponId())// veya coupon.getCouponCode()
                        .discountAmount(coupon.getCouponPrice()) // veya coupon.getCouponPrice()
                        .build())
                .toList();
    }
    public void changeStatusToUsed(Integer couponId){
        Coupon coupon = couponRepository.findById(couponId).get();
        coupon.setStatus(CouponStatus.USED);
        couponRepository.save(coupon);
    }
}
