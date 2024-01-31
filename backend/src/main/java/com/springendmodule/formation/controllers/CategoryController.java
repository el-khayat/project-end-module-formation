package com.springendmodule.formation.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.springendmodule.formation.dtos.CategoryDTO;
import com.springendmodule.formation.servies.CategoryService;

@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "*")
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
