package com.ael.productservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
public class SubCategoryResponse {
    private Integer subCategoryId;
    private String subCategoryName;
    private Integer categoryId;
    private String categoryName;
}
