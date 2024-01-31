package com.springendmodule.formation.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springendmodule.formation.dtos.FormationDTO;
import com.springendmodule.formation.servies.FormationService;

@RestController
@RequestMapping("/formation")
@CrossOrigin(origins = "*") 
public class FormationController {
	
	@Autowired
	FormationService formationService;
	
	@GetMapping("/all")
	public List<FormationDTO> getAllFormation(){
		return formationService.getAllFormation();
	}
	
	@GetMapping("/available")
	public List<FormationDTO> getAvailableFormation(){
		return formationService.getAvailableFormation();
	}
	
	@GetMapping("{id}")
	public FormationDTO getById(@PathVariable Long id) {
		return formationService.getById(id);
	}
	//formationService.getById(id).getIndividuals().size()
	@PostMapping("/save")
	public FormationDTO save(@RequestBody FormationDTO formationDTO) {
		return formationService.save(formationDTO);
	}
	
	@PutMapping("/update")
	public FormationDTO update(@RequestBody FormationDTO formationDTO) {
		System.out.println(formationDTO);
		return formationService.update(formationDTO);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteById(@PathVariable Long id) {
		formationService.deleteById(id);
	}

}