package com.ael.basketservice.service.impl;

import com.ael.basketservice.client.ProductClient;
import com.ael.basketservice.dto.response.BasketProductUnitResponse;
import com.ael.basketservice.dto.response.ProductUnitResponse;
import com.ael.basketservice.model.Basket;
import com.ael.basketservice.model.BasketProductUnit;
import com.ael.basketservice.model.Product;
import com.ael.basketservice.repository.IBasketProductUnitRepository;
import com.ael.basketservice.repository.IBasketRepository;
import com.ael.basketservice.service.abstracts.IBasketProductUnitService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import com.ael.basketservice.mapping.MapperToProductUnitResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BasketProductUnitService implements IBasketProductUnitService {
    private static final Logger logger = LoggerFactory.getLogger(BasketProductUnitService.class);
    private final IBasketProductUnitRepository basketProductUnitRepository;
    private final ProductClient productClient;
    private final IBasketRepository basketRepository;
    private final BasketService basketService;


    @Override
    public void addBasketProductUnit(BasketProductUnit basketProductUnit) {
        basketProductUnitRepository.save(basketProductUnit);
    }

    @Override
    public BasketProductUnitResponse getBasketProductUnitByBasketId(Integer basketId) {

       if(basketService.getBasketByBasketId(basketId).getBasketStatus().equals(1)){
           List<BasketProductUnit> basketProductUnits = basketProductUnitRepository.findBasketProductUnitByBasket_BasketId(basketId);


           List<ProductUnitResponse> productUnitResponses = basketProductUnits.stream()
                   .map(pu ->
                           ProductUnitResponse.builder()
                                   .productId(pu.getProductId())
                                   .basketProductUnitId(pu.getBasketProductUnitId())
                                   .productDescription(productClient.getProductById(pu.getProductId()).getProductDescription())
                                   .productName(pu.getProductName())  // Basket ID ekleniyor
                                   .productPrice(pu.getProductUnitPrice())// Ürün bilgisi çekiliyor
                                   .build())
                   .toList();

           BasketProductUnitResponse basketProductUnitResponse = BasketProductUnitResponse.builder()
                   .basketProducts(productUnitResponses)
                   .basketId(basketId)
                   .build();

           return basketProductUnitResponse;
       }
       else{
           return null;
       }
    }

    @Override
    public BasketProductUnitResponse getBasketProductUnitByCustomerId(Integer customerId) {

        List<BasketProductUnit> basketProductUnits = basketProductUnitRepository.findBasketProductUnitByBasket_CustomerId(customerId);
        Basket basket = basketRepository.findBasketByCustomerId(customerId);
        Integer basketId = basket.getBasketId();
        if(basket.getBasketStatus().equals(1)){
            List<ProductUnitResponse> productUnitResponses = basketProductUnits.stream()
                    .map(pu ->
                            ProductUnitResponse.builder()
                                    .basketProductUnitId(pu.getBasketProductUnitId())
                                    .productDescription(productClient.getProductById(pu.getProductId()).getProductDescription())
                                    .productId(pu.getProductId())
                                    .subCategoryId(productClient.getProductById(pu.getProductId()).getSubCategoryId())
                                    .subCategoryName(productClient.getProductById(pu.getProductId()).getSubCategoryName())
                                    .productModel(productClient.getProductById(pu.getProductId()).getProductModel())
                                    .productModelYear(productClient.getProductById(pu.getProductId()).getProductModelYear())
                                    .productName(pu.getProductName())  // Basket ID ekleniyor
                                    .productPrice(pu.getProductUnitPrice())// Ürün bilgisi çekiliyor
                                    .productQuantity(pu.getProductQuantity())
                                    .build())
                    .toList();

            BasketProductUnitResponse basketProductUnitResponse = BasketProductUnitResponse.builder()
                    .basketProducts(productUnitResponses)
                    .basketId(basketId)
                    .build();

            return basketProductUnitResponse;
        }else{
            return BasketProductUnitResponse.builder()
                    .basketProducts(new ArrayList<>())
                    .basketId(basketId)
                    .build();
        }

    }

    @Override
    public BasketProductUnitResponse basketProductListing(Integer customerId) {
        logger.info("Listing basket products for customer ID: {}", customerId);

        try {
            // Müşterinin aktif sepetini bul
            Basket activeBasket = basketService.getActiveBasketOrNull(customerId);

            if (activeBasket == null) {
                logger.info("No active basket found for customer: {}", customerId);
                return BasketProductUnitResponse.builder()
                        .basketProducts(new ArrayList<>())
                        .basketId(null)
                        .build();
            }

            // Aktif sepetin ürünlerini getir
            List<BasketProductUnit> basketProductUnits = basketProductUnitRepository
                    .findBasketProductUnitByBasket_BasketId(activeBasket.getBasketId());

            if (basketProductUnits.isEmpty()) {
                logger.info("Active basket {} is empty for customer: {}", activeBasket.getBasketId(), customerId);
                return BasketProductUnitResponse.builder()
                        .basketProducts(new ArrayList<>())
                        .basketId(activeBasket.getBasketId())
                        .build();
            }

            // Ürünleri ProductUnitResponse'a dönüştür
            List<ProductUnitResponse> productUnitResponses = basketProductUnits.stream()
                    .map(pu -> {
                        try {
                            ProductUnitResponse productInfo = productClient.getProductById(pu.getProductId());
                            return ProductUnitResponse.builder()
                                    .basketProductUnitId(pu.getBasketProductUnitId())
                                    .productDescription(productInfo.getProductDescription())
                                    .productId(pu.getProductId())
                                    .subCategoryId(productInfo.getSubCategoryId())
                                    .subCategoryName(productInfo.getSubCategoryName())
                                    .productName(pu.getProductName())
                                    .productPrice(pu.getProductUnitPrice())
                                    .productQuantity(pu.getProductQuantity())
                                    .productImageUrl(productInfo.getProductImageUrl())
                                    .build();
                        } catch (Exception e) {
                            logger.error("Error getting product info for product ID: {}", pu.getProductId(), e);
                            // Ürün bilgisi alınamazsa sadece basket'teki bilgileri kullan
                            return ProductUnitResponse.builder()
                                    .basketProductUnitId(pu.getBasketProductUnitId())
                                    .productDescription("Product information unavailable")
                                    .productId(pu.getProductId())
                                    .productName(pu.getProductName())
                                    .productPrice(pu.getProductUnitPrice())
                                    .productQuantity(pu.getProductQuantity())
                                    .build();
                        }
                    })
                    .collect(Collectors.toList());

            // Toplam fiyat ve miktar hesapla
            double totalPrice = basketProductUnits.stream()
                    .mapToDouble(BasketProductUnit::getProductTotalPrice)
                    .sum();

            int totalQuantity = basketProductUnits.stream()
                    .mapToInt(BasketProductUnit::getProductQuantity)
                    .sum();

            BasketProductUnitResponse response = BasketProductUnitResponse.builder()
                    .basketProducts(productUnitResponses)
                    .basketId(activeBasket.getBasketId())
                    .build();

            logger.info("Found {} products in active basket {} for customer {} - Total: {} items, {} TL",
                    productUnitResponses.size(), activeBasket.getBasketId(), customerId, totalQuantity, totalPrice);

            return response;

        } catch (Exception e) {
            logger.error("Error listing basket products for customer: {}", customerId, e);
            return BasketProductUnitResponse.builder()
                    .basketProducts(new ArrayList<>())
                    .basketId(null)
                    .build();
        }
    }

    @Override
    public BasketProductUnitResponse getActiveBasketProductUnitsByCustomerId(Integer customerId) {
        logger.info("Getting active basket product units for customer ID: {}", customerId);

        try {
            // Müşterinin aktif sepetini bul
            Basket activeBasket = basketService.getActiveBasket(customerId);

            if (activeBasket == null) {
                logger.warn("No active basket found for customer: {}", customerId);
                return BasketProductUnitResponse.builder()
                        .basketProducts(new ArrayList<>())
                        .basketId(null)
                        .build();
            }

            // Aktif sepetin ürünlerini getir
            List<BasketProductUnit> basketProductUnits = basketProductUnitRepository
                    .findBasketProductUnitByBasket_BasketId(activeBasket.getBasketId());

            List<ProductUnitResponse> productUnitResponses = basketProductUnits.stream()
                    .map(pu -> {
                        try {
                            ProductUnitResponse productInfo = productClient.getProductById(pu.getProductId());
                            return ProductUnitResponse.builder()
                                    .basketProductUnitId(pu.getBasketProductUnitId())
                                    .productDescription(productInfo.getProductDescription())
                                    .productId(pu.getProductId())
                                    .subCategoryId(productInfo.getSubCategoryId())
                                    .subCategoryName(productInfo.getSubCategoryName())
                                    .productName(pu.getProductName())
                                    .productPrice(pu.getProductUnitPrice())
                                    .productQuantity(pu.getProductQuantity())
                                    .build();
                        } catch (Exception e) {
                            logger.error("Error getting product info for product ID: {}", pu.getProductId(), e);
                            // Ürün bilgisi alınamazsa sadece basket'teki bilgileri kullan
                            return ProductUnitResponse.builder()
                                    .basketProductUnitId(pu.getBasketProductUnitId())
                                    .productDescription("Product information unavailable")
                                    .productId(pu.getProductId())
                                    .productName(pu.getProductName())
                                    .productPrice(pu.getProductUnitPrice())
                                    .productQuantity(pu.getProductQuantity())
                                    .build();
                        }
                    })
                    .collect(Collectors.toList());

            BasketProductUnitResponse response = BasketProductUnitResponse.builder()
                    .basketProducts(productUnitResponses)
                    .basketId(activeBasket.getBasketId())
                    .build();

            logger.info("Found {} products in active basket {} for customer {}",
                    productUnitResponses.size(), activeBasket.getBasketId(), customerId);

            return response;

        } catch (Exception e) {
            logger.error("Error getting active basket product units for customer: {}", customerId, e);
            return BasketProductUnitResponse.builder()
                    .basketProducts(new ArrayList<>())
                    .basketId(null)
                    .build();
        }
    }



    @Override
    public void incrementProductQuantity(Integer basketProductUnitId) {
        basketProductUnitRepository.findById(basketProductUnitId)
                .ifPresent(basketProductUnit ->
                {
                    basketProductUnit.setProductQuantity(basketProductUnit.getProductQuantity() + 1);
                    basketProductUnitRepository.save(basketProductUnit);
                });

    }

    @Override
    public void decrementProductQuantity(Integer basketProductUnitId) {
        basketProductUnitRepository.findById(basketProductUnitId)
                .ifPresent(basketProductUnit ->
                {
                    if(basketProductUnit.getProductQuantity()>1){
                        basketProductUnit.setProductQuantity(basketProductUnit.getProductQuantity() - 1);
                        basketProductUnitRepository.save(basketProductUnit);
                    } else if (basketProductUnit.getProductQuantity()==1) {
                        basketProductUnitRepository.delete(basketProductUnit);
                    }
                });
    }


}
