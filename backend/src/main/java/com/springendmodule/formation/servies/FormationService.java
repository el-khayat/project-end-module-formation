package com.springendmodule.formation.servies;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springendmodule.formation.dtos.FormationDTO;
import com.springendmodule.formation.entities.Formation;
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
	
	public FormationDTO save(FormationDTO formationDTO) {
		
		Formation formation=formationMapper.fromFormationDTO(formationDTO);
		formationRepository.save(formation);
		return formationDTO;
		
	}
	
	public void deleteById(Long id) {
		
		formationRepository.deleteById(id);
		
	}
	
	public FormationDTO update(FormationDTO formationDTO) {
		
		Formation formation= formationMapper.fromFormationDTO(formationDTO);
		formationRepository.save(formation);
		return formationDTO;
		
	}

}
