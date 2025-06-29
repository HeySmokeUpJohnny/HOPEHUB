package com.ael.productservice.controller;


import com.ael.productservice.dto.request.ProductRequest;
import com.ael.productservice.dto.request.ProductUpdateRequest;
import com.ael.productservice.dto.response.ProductCreateResponse;
import com.ael.productservice.dto.response.ProductGetAllResponse;
import com.ael.productservice.dto.response.ProductUnitResponse;
import com.ael.productservice.dto.response.ProductUpdateResponse;
import com.ael.productservice.model.Product;
import com.ael.productservice.service.abstracts.IProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
@AllArgsConstructor
public class ProductController {

    IProductService productService;

    @GetMapping("/getAllProducts")
    public List<ProductGetAllResponse> getAllProducts() {

        return productService.getAllProducts();
    };


    @PostMapping("/createProduct")
    public ResponseEntity<ProductCreateResponse> createProduct(@RequestBody ProductRequest productRequest) {

        productService.createProduct(productRequest);

        return ResponseEntity.ok()
                .body(ProductCreateResponse.builder()
                        .message("Created Succesfuly")
                        .build()
                );

    };

    @GetMapping("/getProductById/{productId}")
    public ProductUnitResponse getProductById(@PathVariable Integer productId){
        return productService.getProduct(productId);
    }

    @DeleteMapping("/deleteProduct/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer productId){
        return ResponseEntity.ok(productService.deleteProduct(productId));
    }

    @PutMapping("/updateProduct/{productId}")
    public ResponseEntity<ProductUpdateResponse> updateProduct(
            @PathVariable Integer productId,
            @RequestBody ProductUpdateRequest productUpdateRequest) {

        ProductUpdateResponse response = productService.updateProduct(productId, productUpdateRequest);
        return ResponseEntity.ok(response);
    }
}
