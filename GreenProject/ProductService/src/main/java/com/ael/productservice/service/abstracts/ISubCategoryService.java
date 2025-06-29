package com.ael.productservice.service.abstracts;

import com.ael.productservice.dto.request.SubCategoryRequest;
import com.ael.productservice.dto.response.SubCategoryResponse;
import com.ael.productservice.model.SubCategory;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ISubCategoryService {
    void createSubCategory(SubCategoryRequest subCategoryRequest);
    List<SubCategoryResponse> getAllSubCategories();
}
