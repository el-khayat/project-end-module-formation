package com.springendmodule.formation.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
	
	@GetMapping("{id}")
	public FormationDTO getById(@PathVariable Long id) {
		return formationService.getById(id);
	}
	
	@PostMapping("/save")
	public FormationDTO save(@RequestBody FormationDTO formationDTO) {
		return formationService.save(formationDTO);
	}
	
	@PutMapping("/update")
	public FormationDTO update(@RequestBody FormationDTO formationDTO) {
		return formationService.update(formationDTO);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteById(@PathVariable Long id) {
		formationService.deleteById(id);
	}

}
