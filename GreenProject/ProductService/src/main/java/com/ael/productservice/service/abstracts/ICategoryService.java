package com.ael.productservice.service.abstracts;

import com.ael.productservice.dto.request.CategoryRequest;
import com.ael.productservice.dto.response.CategoryResponse;
import com.ael.productservice.model.Category;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICategoryService {
    void createCategory(CategoryRequest categoryRequest);
    //List<CategoryResponse> getAllCategories();
    List<CategoryResponse> findAllWithSubCategories();
}
