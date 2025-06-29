package com.ael.basketservice.service.impl;

import com.ael.basketservice.client.ProductClient;
import com.ael.basketservice.dto.request.BasketRequest;
import com.ael.basketservice.dto.response.ProductUnitResponse;
import com.ael.basketservice.exception.BasketNotFoundException;
import com.ael.basketservice.model.BasketStatus;
import com.ael.basketservice.statics.BasketStatusName;
import com.ael.basketservice.model.Basket;
import com.ael.basketservice.model.BasketProductUnit;
import com.ael.basketservice.repository.IBasketProductUnitRepository;
import com.ael.basketservice.repository.IBasketRepository;
import com.ael.basketservice.service.abstracts.IBasketProductUnitService;
import com.ael.basketservice.service.abstracts.IBasketService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class BasketService implements IBasketService {
    private static final Logger logger = LoggerFactory.getLogger(BasketService.class);
    private final IBasketRepository basketRepository;
    private final IBasketProductUnitRepository basketProductUnitRepository;
    private final ProductClient productClient;

    @Override
    public Basket createNewBasket(Integer customerId) {


        BasketStatus status = BasketStatus.builder().basketStatusId(Long.valueOf(BasketStatusName.Aktif)).build();


        Basket newBasket = Basket.builder()
                .customerId(customerId)
                .basketStatus(status)
                .build();

        basketRepository.save(newBasket);

        return newBasket;

    }

    @Transactional
    @Override
    public void addProductToBasket(Integer basketId, Integer productId) {

        Basket basket = basketRepository.findById(basketId).orElseThrow(() -> new BasketNotFoundException("Sepet Bulunamadı"));
        ProductUnitResponse productUnitResponse = productClient.getProductById(productId);
        // Sadece aktif sepetlere ürün eklenebilir
        if (basket.getBasketStatus().getBasketStatusId().equals(Long.valueOf(BasketStatusName.Aktif))) {

            // Yeni method kullan - Optional döndürür
            Optional<BasketProductUnit> existingProductOpt = basketProductUnitRepository
                    .findFirstByBasketIdAndProductIdOrderByIdDesc(basketId, productId);

            if (existingProductOpt.isPresent()) {
                // Ürün zaten sepette varsa miktarını artır
                BasketProductUnit basketProductUnits = existingProductOpt.get();
                basketProductUnits.setProductQuantity(basketProductUnits.getProductQuantity() + 1);
                basketProductUnits.setProductTotalPrice((basketProductUnits.getProductQuantity()) * productUnitResponse.getProductPrice());
                basketProductUnitRepository.save(basketProductUnits);
                logger.info("Product quantity increased in basket {}", basketId);
            } else {
                // Yeni ürün ekle
                BasketProductUnit newBasketProductUnit = BasketProductUnit.builder()
                        .basket(basket)
                        .productUnitPrice(productUnitResponse.getProductPrice())
                        .productId(productUnitResponse.getProductId())
                        .productName(productUnitResponse.getProductName())
                        .productTotalPrice(productUnitResponse.getProductPrice() * 1)
                        .productQuantity(1).build();
                basketProductUnitRepository.save(newBasketProductUnit);
                logger.info("New product added to basket {}", basketId);
            }
        } else {
            logger.warn("Cannot add product to basket {} - basket is not active", basketId);
            throw new RuntimeException("Sepet aktif değil, ürün eklenemez");
        }



    }

    @Override
    public void addProductToCustomerBasket(Integer customerId, Integer productId) {
        logger.info("Adding product {} to customer {} basket", productId, customerId);

        // Müşterinin aktif sepetini bul veya yeni oluştur
        Basket activeBasket = getActiveBasket(customerId);

        // Ürünü sepete ekle
        addProductToBasket(activeBasket.getBasketId(), productId);

        logger.info("Product {} successfully added to customer {} basket {}",
                productId, customerId, activeBasket.getBasketId());
    }

    @Override
    public void removeProductFromBasket(Integer productId, Integer basketId) {
        basketProductUnitRepository.deleteBasketProductUnitByProductIdAndBasket_BasketId(productId, basketId);
    }

    @Override
    public Basket getBasketByCustomerId(Integer customerId) {
        return basketRepository.findBasketByCustomerId(customerId);
    }

    @Override
    public Basket getBasketByBasketId(Integer basketId) {
        return basketRepository.findBasketByBasketId(basketId);
    }

    //    @Override
//    public Basket getActiveBasket(Integer customerId) {
//        return basketRepository.findByCustomerIdAndBasketStatus_BasketStatusId(customerId, 1).orElseGet(() -> createNewBasket(customerId));
//    }
    @Override
    public Basket getActiveBasket(Integer customerId) {
        logger.info("Getting active basket for customer: {}", customerId);

        Optional<Basket> existingBasket = basketRepository.findByCustomerIdAndBasketStatus_BasketStatusId(customerId, 1);

        if (existingBasket.isPresent()) {
            logger.info("Found existing active basket: {}", existingBasket.get().getBasketId());
            return existingBasket.get();
        } else {
            logger.info("No active basket found, creating new one for customer: {}", customerId);
            return createNewBasket(customerId);
        }
    }


    public Basket getActiveBasketOrNull(Integer customerId) {
        logger.info("Getting active basket for customer: {} (will return null if not exists)", customerId);

        Optional<Basket> existingBasket = basketRepository.findByCustomerIdAndBasketStatus_BasketStatusId(customerId, 1);

        if (existingBasket.isPresent()) {
            logger.info("Found existing active basket: {}", existingBasket.get().getBasketId());
            return existingBasket.get();
        } else {
            logger.info("No active basket found for customer: {}", customerId);
            return null;
        }
    }

    @Override
    public BasketStatus getBasketStatus(Integer basketId) {
        return basketRepository.getBasketStatus(basketId);
    }

    @Override
    public void updateBasketStatus(Integer basketId, Integer newStatus) {
        Basket basket = basketRepository.findById(basketId)
                .orElseThrow(() -> new BasketNotFoundException("Sepet bulunamadı: " + basketId));

        BasketStatus status = BasketStatus.builder().basketStatusId(Long.valueOf(newStatus)).build();
        basket.setBasketStatus(status);
        basketRepository.save(basket);
    }


}
