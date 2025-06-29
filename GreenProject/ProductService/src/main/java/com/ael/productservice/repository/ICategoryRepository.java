package com.ael.productservice.repository;

import com.ael.productservice.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ICategoryRepository extends JpaRepository<Category, Integer> {
    @Query("SELECT c FROM Category c JOIN FETCH c.subCategories")
    List<Category> findAllWithSubCategories();
}
