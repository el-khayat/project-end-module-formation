package com.springendmodule.formation.servies;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springendmodule.formation.dtos.FormationDTO;
import com.springendmodule.formation.entities.Formation;
import com.springendmodule.formation.entities.User;
import com.springendmodule.formation.mappers.FormationMapper;
import com.springendmodule.formation.repositories.FormationRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FormationService {
	
	@Autowired
	FormationRepository formationRepository;
	
	@Autowired
	FormationMapper formationMapper;
	
	public List<FormationDTO> getAllFormation(){
		List<Formation> formations=formationRepository.findAll();
		List<FormationDTO> formationDTOs = formations.stream().map(frm -> formationMapper.fromFormation(frm))
				.collect(Collectors.toList());
		return formationDTOs;
	}
	
	public List<FormationDTO> getAvailableFormation(){
		List<Formation> formations=formationRepository.findAll();
		List<Formation> availableFormations = new ArrayList<>(); 
		for(Formation formation:formations)
		{
			if(formation.getIndividuals().size() < formation.getTotalMembers())
			{
				availableFormations.add(formation);
			}
		}
		List<FormationDTO> formationDTOs = availableFormations.stream().map(frm -> formationMapper.fromFormation(frm))
				.collect(Collectors.toList());
		return formationDTOs;
	}
	
	public FormationDTO getById(Long id) {
		
		Formation formation=formationRepository.findById(id).orElse(null);
		return formationMapper.fromFormation(formation);
		
	}
	
	public FormationDTO save(FormationDTO formationDTO) {
		
		Formation formation=formationMapper.fromFormationDTO(formationDTO);
		formationRepository.save(formation);
		return formationDTO;
		
	}
	
	public void deleteById(Long id) {
		Formation formation=formationRepository.findById(id).orElse(null);
		formation.getIndividuals().forEach(individual -> individual.getFormations().remove(formation));
		formation.getIndividuals().clear();
		
		User user = formation.getUser(); // Get the user associated with the formation
	    if (user != null) {
	        user.getFormations().remove(formation); // Remove the formation from the user's formations list
	    }
		formationRepository.deleteById(id);
		
	}
	
	public FormationDTO update(FormationDTO formationDTO) {
		
		Formation formation= formationMapper.fromFormationDTO(formationDTO);
		formationRepository.save(formation);
		return formationDTO;
		
	}

}
