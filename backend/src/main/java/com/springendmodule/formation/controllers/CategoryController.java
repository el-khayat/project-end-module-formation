package com.springendmodule.formation.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springendmodule.formation.dtos.CategoryDTO;
import com.springendmodule.formation.servies.CategoryService;

@RestController
@RequestMapping("/category")
public class CategoryController {
	
	@Autowired
	CategoryService categoryService;
	
	@GetMapping("/all")
	public List<CategoryDTO> getAllCategories(){
		return categoryService.getAllCategories();
	}
	
	@GetMapping("{id}")
	public CategoryDTO getById(@PathVariable Long id) {
		return categoryService.getByID(id);
	}
	
	@PutMapping("/update")
	public CategoryDTO update(@RequestBody CategoryDTO categoryDTO) {
		return categoryService.update(categoryDTO);
	}
	
	@PostMapping("/save")
	public CategoryDTO save(@RequestBody CategoryDTO categoryDTO) {
		return categoryService.save(categoryDTO);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteById(@PathVariable Long id) {
		categoryService.deleteById(id);
	}

}
