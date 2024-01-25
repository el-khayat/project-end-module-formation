package com.springendmodule.formation.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
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

import com.springendmodule.formation.dtos.EntrepriseDTO;
import com.springendmodule.formation.servies.EntrepriseService;

@RestController
@RequestMapping("/entreprise")
@CrossOrigin(origins = "*")
public class EntrepriseController {
	
	@Autowired
	EntrepriseService entrepriseService;
	
	@GetMapping("/all")
	@PreAuthorize("hasAuthority('ADMIN_ROLE') or hasAuthority('ASSISTANT_ROLE')")
	public ResponseEntity<List<EntrepriseDTO>> getAllEntreprise(){
		return new ResponseEntity<>(entrepriseService.getAllEntreprise(), HttpStatusCode.valueOf(200));
	}
	
	@GetMapping("/{id}")
	@PreAuthorize("hasAuthority('ADMIN_ROLE') or hasAuthority('ASSISTANT_ROLE')")
	public EntrepriseDTO getById(@PathVariable Long id) {
		return entrepriseService.getById(id);
	}
	
	@PostMapping("/save")
	@PreAuthorize("hasAuthority('ADMIN_ROLE') or hasAuthority('ASSISTANT_ROLE')")
	public ResponseEntity<EntrepriseDTO> save(@RequestBody EntrepriseDTO entrepriseDTO) {
		return new ResponseEntity<>(entrepriseService.save(entrepriseDTO), HttpStatusCode.valueOf(200));
	}
	
	@PutMapping("/update")
	@PreAuthorize("hasAuthority('ADMIN_ROLE') or hasAuthority('ASSISTANT_ROLE')")
	public EntrepriseDTO update(@RequestBody EntrepriseDTO entrepriseDTO) {
		return entrepriseService.update(entrepriseDTO);
	}
	
	@DeleteMapping("delete/{id}")
	@PreAuthorize("hasAuthority('ADMIN_ROLE') or hasAuthority('ASSISTANT_ROLE')")
	public void deleteById(@PathVariable Long id) {
		entrepriseService.deleteById(id);
	}

}
