package com.ael.productservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name="products")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productId;
    private String productName;
    private String productModel;
    private String productModelYear;
    private String productDescription;
    private Double productPrice;
    private Integer productQuantity;
    private String productImageUrl;

    @ManyToOne
    @JoinColumn(name = "productSubCategoryId")
    private SubCategory subcategory;



}
