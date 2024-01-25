package com.springendmodule.formation.dtos;

import java.util.Date;
import java.util.List;

import com.springendmodule.formation.entities.Category;
import com.springendmodule.formation.entities.Individual;
import com.springendmodule.formation.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormationDTO {
	
	private Long id;

	private int numberHours;
	
	private double price;
	
	private String descreption;
	
	private String subject;
	
	private String city;
	
	private Date date;
	
	private Category category;
	
	private User user;
	
	private List<Individual> individuals;
	
}
