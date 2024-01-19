package com.springendmodule.formation.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Data
public class FeedbackDTO {
	
	private Long id;
	
	private String note;
	
	private String message;

}
