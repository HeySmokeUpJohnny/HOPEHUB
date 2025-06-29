package com.ael.productservice.mapping;


import com.ael.productservice.dto.response.SubCategoryResponse;
import com.ael.productservice.model.SubCategory;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.stereotype.Component;

@Component
public class SubCategoryMapper {
    private final ModelMapper modelMapper;

    public SubCategoryMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;

        // Özel mapping ayarları
        modelMapper.addMappings(new PropertyMap<SubCategory, SubCategoryResponse>() {
            @Override
            protected void configure() {
                map().setCategoryId(source.getCategory().getCategoryId());
                map().setCategoryName(source.getCategory().getCategoryName());
            }
        });
    }

    public SubCategoryResponse convertToDto(SubCategory subCategory) {
        return modelMapper.map(subCategory, SubCategoryResponse.class);
    }
}
