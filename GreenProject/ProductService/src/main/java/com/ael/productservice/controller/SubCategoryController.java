package com.ael.productservice.controller;


import com.ael.productservice.dto.request.SubCategoryRequest;
import com.ael.productservice.dto.response.SubCategoryResponse;
import com.ael.productservice.model.SubCategory;
import com.ael.productservice.service.abstracts.ISubCategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subCategory")
@AllArgsConstructor
public class SubCategoryController {

    ISubCategoryService subCategoryService;

    @GetMapping("/getAllSubCategories")
    public ResponseEntity<List<SubCategoryResponse>> getAllSubCategories() {
        return ResponseEntity.ok(subCategoryService.getAllSubCategories());
    }

    @PostMapping("/createSubCategory")
    public ResponseEntity<String> createSubCategory(@RequestBody SubCategoryRequest subCategoryRequest) {

        subCategoryService.createSubCategory(subCategoryRequest);
        return ResponseEntity.ok("SubCategory created");
    }

}
