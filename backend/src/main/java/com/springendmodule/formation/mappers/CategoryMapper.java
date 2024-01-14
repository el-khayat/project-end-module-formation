package com.springendmodule.formation.mappers;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.springendmodule.formation.dtos.CategoryDTO;
import com.springendmodule.formation.entities.Category;

@Service
public class CategoryMapper {
	
	public Category fromCategoryDTO(CategoryDTO categoryDTO) {
		
		Category category=new Category();
		BeanUtils.copyProperties(categoryDTO, category);
		return category;
		
	}
	
	public CategoryDTO fromCategory(Category category) {
		
		CategoryDTO categoryDTO=new CategoryDTO();
		BeanUtils.copyProperties(category, categoryDTO);
		return categoryDTO;
		
	}

}
