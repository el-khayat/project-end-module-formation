package com.springendmodule.formation.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.springendmodule.formation.dtos.EntrepriseDTO;
import com.springendmodule.formation.servies.EntrepriseService;

@RestController
@RequestMapping("/entreprise")
@CrossOrigin(origins = "*")
public class EntrepriseController {
	
	@Autowired
	EntrepriseService entrepriseService;
	
	@GetMapping("/all")
	public List<EntrepriseDTO> getAllEntreprise(){
		return entrepriseService.getAllEntreprise();
	}
	
	@GetMapping("/{id}")
	public EntrepriseDTO getById(@PathVariable Long id) {
		return entrepriseService.getById(id);
	}
	
	@PostMapping("/save")
	public EntrepriseDTO save(@RequestBody EntrepriseDTO entrepriseDTO) {
		return entrepriseService.save(entrepriseDTO);
	}
	
	@PutMapping("/update")
	public EntrepriseDTO update(@RequestBody EntrepriseDTO entrepriseDTO) {
		return entrepriseService.update(entrepriseDTO);
	}
	
	@DeleteMapping("delete/{id}")
	public void deleteById(@PathVariable Long id) {
		entrepriseService.deleteById(id);
	}

}
