package com.ael.productservice.service.impl;

import com.ael.productservice.dto.request.ProductRequest;
import com.ael.productservice.dto.request.ProductUpdateRequest;
import com.ael.productservice.dto.response.ProductCreateResponse;
import com.ael.productservice.dto.response.ProductGetAllResponse;
import com.ael.productservice.dto.response.ProductUnitResponse;
import com.ael.productservice.dto.response.ProductUpdateResponse;
import com.ael.productservice.model.Product;
import com.ael.productservice.model.SubCategory;
import com.ael.productservice.repository.IProductRepository;
import com.ael.productservice.repository.ISubCategoryRepository;
import com.ael.productservice.service.abstracts.IProductService;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductService implements IProductService {

    private final IProductRepository productRepository;
    private final ISubCategoryRepository subCategoryRepository;




    @Override
    public ProductCreateResponse createProduct(ProductRequest productRequest) {
        try {

            SubCategory subCategory = subCategoryRepository.findById(productRequest.getSubCategoryId()).orElseThrow(()->new RuntimeException("SubCategory not found"));

            Product newProduct = Product.builder()
                    .productDescription(productRequest.getProductDescription())
                    .productName(productRequest.getProductName())
                    .productPrice(productRequest.getProductPrice())
                    .productQuantity(productRequest.getProductQuantity())
                    .subcategory(subCategory).build();

            productRepository.save(newProduct);

            return ProductCreateResponse.builder()
                    .message("Product created")
                    .build();

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    @Override
    public List<ProductGetAllResponse> getAllProducts() {
        // Product listesi al
        List<Product> products = productRepository.findAll();

        // Product listesini ProductGetAllResponse DTO listesine dönüştür
        List<ProductGetAllResponse> response = products.stream()
                .map(product -> {
                    ProductGetAllResponse dto = new ProductGetAllResponse();
                    dto.setProductId(product.getProductId());
                    dto.setProductName(product.getProductName());
                    dto.setProductDescription(product.getProductDescription());
                    dto.setProductPrice(product.getProductPrice());
                    dto.setProductQuantity(product.getProductQuantity());
                    dto.setSubCategoryId(product.getSubcategory().getSubCategoryId());
                    dto.setProductImageUrl(product.getProductImageUrl());// SubCategoryId'yi al
                    return dto;
                })
                .collect(Collectors.toList());

        return response;
    }

    @Override
    public ProductUnitResponse getProduct(Integer productId) {

        Product product = productRepository.findById(productId).orElseThrow(()->new RuntimeException("Product not found"));

        return  ProductUnitResponse.builder()
                .productName(product.getProductName())
                .productDescription(product.getProductDescription())
                .productPrice(product.getProductPrice())
                .productId(product.getProductId())
                .subCategoryName(product.getSubcategory().getSubCategoryName())
                .subCategoryId(product.getSubcategory().getSubCategoryId())
                .productImageUrl(product.getProductImageUrl())
                .build();


    }

    public String deleteProduct(Integer productId) {
        productRepository.deleteById(productId);
        return String.format("%d Product deleted successfully", productId);
    }

    @Override
    public ProductUpdateResponse updateProduct(Integer productId, ProductUpdateRequest productUpdateRequest) {
        return null;
    }

}
