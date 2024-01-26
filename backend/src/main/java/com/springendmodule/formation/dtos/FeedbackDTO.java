package com.springendmodule.formation.dtos;

import com.springendmodule.formation.entities.Individual;
import com.springendmodule.formation.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor @AllArgsConstructor
@Data
public class FeedbackDTO implements Serializable {
	
	private Long id;
	
	private String note;
	
	private String message;
	
	private Individual individual;
	
	private User user;

}
