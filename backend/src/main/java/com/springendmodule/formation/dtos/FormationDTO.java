package com.springendmodule.formation.dtos;

import java.util.Date;

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
	
}
