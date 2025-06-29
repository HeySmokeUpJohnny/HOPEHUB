package com.ael.productservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Table(name="sub_categories")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity

public class SubCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer subCategoryId;

    private String subCategoryName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "categoryId")
    private Category category;


    @OneToMany(mappedBy = "subcategory",cascade = CascadeType.ALL)
    private List<Product> products;

}
