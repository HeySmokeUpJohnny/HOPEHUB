package com.ael.productservice.service.impl;

import com.ael.productservice.dto.request.CategoryRequest;
import com.ael.productservice.dto.response.CategoryResponse;
import com.ael.productservice.dto.response.SubCategoryDto;
import com.ael.productservice.model.Category;
import com.ael.productservice.repository.ICategoryRepository;
import com.ael.productservice.service.abstracts.ICategoryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CategoryService implements ICategoryService {
    ICategoryRepository categoryRepository;

    @Override
    public void createCategory(CategoryRequest categoryRequest) {

        Category newCategory = Category.builder()
                .categoryName(categoryRequest.getCategoryName())
                .build();

        categoryRepository.save(newCategory);
    }

//    @Override
//    public List<CategoryResponse> getAllCategories() {
//        List<Category> categories = categoryRepository.findAll();
//        return categories.stream().map(category -> new CategoryResponse(category.getCategoryId(), category.getCategoryName())).toList();
//    }

    @Override
    public List<CategoryResponse> findAllWithSubCategories() {
        return categoryRepository.findAllWithSubCategories()
                .stream()
                .map(category -> {
                    List<SubCategoryDto> subDtoList = category.getSubCategories()
                            .stream()
                            .map(sub -> new SubCategoryDto(sub.getSubCategoryId(), sub.getSubCategoryName()))
                            .collect(Collectors.toList());

                    return new CategoryResponse(category.getCategoryId(), category.getCategoryName(), subDtoList);
                })
                .collect(Collectors.toList());
    }

}
