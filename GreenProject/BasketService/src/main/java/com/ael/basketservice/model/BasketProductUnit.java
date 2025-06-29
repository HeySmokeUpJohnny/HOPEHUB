package com.ael.basketservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name="BasketProductUnits")
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BasketProductUnit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer basketProductUnitId;

    @ManyToOne
    @JoinColumn(name = "basketId")
    private Basket basket;
    private Integer productId;
    private String  productName;
    private Integer productQuantity;
    private Double productUnitPrice;
    private Double productTotalPrice;
    private String productModel;
    private String productModelYear;


}
