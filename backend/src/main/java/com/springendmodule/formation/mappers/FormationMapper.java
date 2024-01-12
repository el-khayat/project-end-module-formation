package com.springendmodule.formation.mappers;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.springendmodule.formation.dtos.FormationDTO;
import com.springendmodule.formation.entities.Formation;

@Service
public class FormationMapper {
	
	public Formation fromFormationDTO(FormationDTO formationDTO) {
		
		Formation formation=new Formation();
		BeanUtils.copyProperties(formationDTO, formation);
		return formation;
	}
	
	public FormationDTO fromFormation(Formation formation) {
		
		FormationDTO formationDTO=new FormationDTO();
		BeanUtils.copyProperties(formation, formationDTO);
		return formationDTO;
	}

}
