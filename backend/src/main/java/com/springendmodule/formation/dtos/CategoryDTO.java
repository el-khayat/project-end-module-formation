package com.springendmodule.formation.dtos;

import java.util.List;

import com.springendmodule.formation.entities.Formation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor @NoArgsConstructor
public class CategoryDTO {
	
	private Long id;
	
	private String title;
	
	private List<Formation> formations;

}
