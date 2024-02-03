package com.springendmodule.formation.servies;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springendmodule.formation.dtos.EntrepriseDTO;
import com.springendmodule.formation.entities.Entreprise;
import com.springendmodule.formation.mappers.EntrepriseMapper;
import com.springendmodule.formation.repositories.EntrepriseRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class EntrepriseService {

	@Autowired
	EntrepriseRepository entrepriseRepository;

	@Autowired
	EntrepriseMapper entrepriseMapper;

	public List<EntrepriseDTO> getAllEntreprise() {

		List<Entreprise> entreprises = entrepriseRepository.findAll();
		List<EntrepriseDTO> entrepriseDTOs = entreprises.stream().map(entr -> entrepriseMapper.fromEntreprise(entr))
				.collect(Collectors.toList());
		return entrepriseDTOs;
	}

	public EntrepriseDTO getById(Long id) {

		Entreprise entreprise = entrepriseRepository.findById(id).orElse(null);
		EntrepriseDTO entrepriseDTO = entrepriseMapper.fromEntreprise(entreprise);
		return entrepriseDTO;

	}

	public EntrepriseDTO save(EntrepriseDTO entrepriseDTO) {

		Entreprise entreprise = entrepriseMapper.fromEntropriseDTO(entrepriseDTO);
		entrepriseRepository.save(entreprise);
		return entrepriseDTO;

	}

	public EntrepriseDTO update(EntrepriseDTO entrepriseDTO) {

		Entreprise entreprise = entrepriseMapper.fromEntropriseDTO(entrepriseDTO);
		entrepriseRepository.save(entreprise);
		return entrepriseDTO;

	}

	public void deleteById(Long id) {
		
		entrepriseRepository.deleteById(id);
		
	}
	
}
