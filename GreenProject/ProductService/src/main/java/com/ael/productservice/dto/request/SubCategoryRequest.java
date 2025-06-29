package com.ael.productservice.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SubCategoryRequest {
    private Integer categoryId;
    private String subCategoryName;
}
