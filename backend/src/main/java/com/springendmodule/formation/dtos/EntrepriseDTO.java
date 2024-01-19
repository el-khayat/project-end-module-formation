package com.springendmodule.formation.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor 
@Data
public class EntrepriseDTO {
	
	private Long id;
	
	private String name;
	
	private String address;
	
	private String phone;
	
	private String url;
	
	private String email;

}
