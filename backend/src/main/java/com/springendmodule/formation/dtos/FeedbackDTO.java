package com.springendmodule.formation.dtos;

import com.springendmodule.formation.entities.Individual;
import com.springendmodule.formation.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Data
public class FeedbackDTO {
	
	private Long id;
	
	private String note;
	
	private String message;
	
	private Individual individual;
	
	private User user;

}
