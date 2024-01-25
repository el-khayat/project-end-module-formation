package com.springendmodule.formation.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
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
@CrossOrigin(origins = "*") // allow requests from this origin
public class FormationController {
	
	@Autowired
	FormationService formationService;
	
	
	//@Secured("IS_AUTHENTICATED_ANONYMOUSLY")
	//@PreAuthorize("permitAll()") // Allows all access, even unauthenticated
	//@PreAuthorize("isAnonymous()")
	//@Secured({"IS_AUTHENTICATED_ANONYMOUSLY", "ROLE_ANONYMOUS"})
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
	
	//@PreAuthorize("hasAuthority('ADMIN_ROLE,ASSISTANT_ROLE')")
	@PutMapping("/update")
	public FormationDTO update(@RequestBody FormationDTO formationDTO) {
		return formationService.update(formationDTO);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteById(@PathVariable Long id) {
		formationService.deleteById(id);
	}

}
