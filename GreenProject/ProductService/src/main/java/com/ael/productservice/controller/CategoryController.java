package com.ael.productservice.controller;

import com.ael.productservice.dto.request.CategoryRequest;
import com.ael.productservice.dto.response.CategoryResponse;
import com.ael.productservice.model.Category;
import com.ael.productservice.service.abstracts.ICategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@AllArgsConstructor
public class CategoryController {

    ICategoryService categoryService;

    @PostMapping("/createCategory")
    public ResponseEntity<String> createCategory(@RequestBody CategoryRequest categoryRequest) {

        categoryService.createCategory(categoryRequest);

        return ResponseEntity.ok().body("Category created");
    }

    @GetMapping("/getAllCategories")
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        return ResponseEntity.ok().body(categoryService.findAllWithSubCategories());
    }

}
