package com.springendmodule.formation.servies;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springendmodule.formation.dtos.CategoryDTO;
import com.springendmodule.formation.entities.Category;
import com.springendmodule.formation.mappers.CategoryMapper;
import com.springendmodule.formation.repositories.CategoryRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CategoryService {

	@Autowired
	CategoryRepository categoryRepository;

	@Autowired
	CategoryMapper categoryMapper;

	public List<CategoryDTO> getAllCategories() {

		List<Category> catygories = categoryRepository.findAll();
		List<CategoryDTO> catygoryDTOs = catygories.stream().map(ct -> categoryMapper.fromCategory(ct))
				.collect(Collectors.toList());
		return catygoryDTOs;

	}
	
	public CategoryDTO getByID(Long id) {
		
		Category category=categoryRepository.findById(id).orElse(null);
		return categoryMapper.fromCategory(category);
		
	}

	public CategoryDTO save(CategoryDTO categoryDTO) {

		Category category = categoryMapper.fromCategoryDTO(categoryDTO);
		categoryRepository.save(category);
		return categoryDTO;

	}

	public CategoryDTO update(CategoryDTO categoryDTO) {

		Category category = categoryMapper.fromCategoryDTO(categoryDTO);
		categoryRepository.save(category);
		return categoryDTO;

	}
	
	public void deleteById(Long id) {
		categoryRepository.deleteById(id);
	}

}
