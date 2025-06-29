package com.ael.productservice.service.impl;

import com.ael.productservice.dto.request.SubCategoryRequest;
import com.ael.productservice.dto.response.SubCategoryResponse;
import com.ael.productservice.mapping.SubCategoryMapper;
import com.ael.productservice.model.Category;
import com.ael.productservice.model.SubCategory;
import com.ael.productservice.repository.ICategoryRepository;
import com.ael.productservice.repository.ISubCategoryRepository;
import com.ael.productservice.service.abstracts.ISubCategoryService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SubCategoryService implements ISubCategoryService {


    ISubCategoryRepository subCategoryRepository;
    ICategoryRepository categoryRepository;


    @Override
    public void createSubCategory(SubCategoryRequest subCategoryRequest) {

        Category category = categoryRepository.findById(subCategoryRequest.getCategoryId()).orElseThrow(() -> new RuntimeException("Category not found"));


        SubCategory newSubCategory = SubCategory.builder()
                .subCategoryName(subCategoryRequest.getSubCategoryName())
                .category(category)
                .build();

        subCategoryRepository.save(newSubCategory);

    }

    @Transactional
    @Override
    public List<SubCategoryResponse> getAllSubCategories() {
        List<SubCategory> subCategories = subCategoryRepository.findAll();
        return subCategories.stream()
                .map(subCategory -> new SubCategoryResponse(
                        subCategory.getSubCategoryId(),
                        subCategory.getSubCategoryName(),
                        subCategory.getCategory().getCategoryId(),
                        subCategory.getCategory().getCategoryName()))
                .toList();
    }


}
