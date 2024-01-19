package com.springendmodule.formation.mappers;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.springendmodule.formation.dtos.EntrepriseDTO;
import com.springendmodule.formation.entities.Entreprise;

@Service
public class EntrepriseMapper {
	
	public Entreprise fromEntropriseDTO(EntrepriseDTO entrepriseDTO) {
		
		Entreprise entreprise=new Entreprise();
		BeanUtils.copyProperties(entrepriseDTO, entreprise);
		return entreprise;
		
	}
	
	public EntrepriseDTO fromEntreprise(Entreprise entreprise) {
		
		EntrepriseDTO entrepriseDTO=new EntrepriseDTO();
		BeanUtils.copyProperties(entreprise, entrepriseDTO);
		return entrepriseDTO;
		
	}

}
