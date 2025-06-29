package com.ael.productservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class CategorySubCategoryResponse {
    private Integer id;
    private String name;
    private List<SubCategoryDto> subcategories;
}
