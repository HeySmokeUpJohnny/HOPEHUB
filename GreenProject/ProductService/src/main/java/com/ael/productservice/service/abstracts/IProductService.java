package com.ael.productservice.service.abstracts;

import com.ael.productservice.dto.request.ProductRequest;
import com.ael.productservice.dto.request.ProductUpdateRequest;
import com.ael.productservice.dto.response.ProductCreateResponse;
import com.ael.productservice.dto.response.ProductGetAllResponse;
import com.ael.productservice.dto.response.ProductUnitResponse;
import com.ael.productservice.dto.response.ProductUpdateResponse;
import com.ael.productservice.model.Product;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductService  {
    ProductCreateResponse createProduct(ProductRequest productRequest);
    List<ProductGetAllResponse> getAllProducts();
    ProductUnitResponse getProduct(Integer productId);
    String deleteProduct(Integer productId);
    ProductUpdateResponse updateProduct(Integer productId, ProductUpdateRequest productUpdateRequest);
}
