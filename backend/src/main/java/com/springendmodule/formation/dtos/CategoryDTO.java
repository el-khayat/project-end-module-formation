package com.springendmodule.formation.dtos;

import java.util.List;

import com.springendmodule.formation.entities.Formation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor @NoArgsConstructor
public class CategoryDTO implements Serializable {
	
	private Long id;
	
	private String title;
	
	private List<Formation> formations;

}
