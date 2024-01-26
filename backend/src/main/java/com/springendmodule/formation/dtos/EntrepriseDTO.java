package com.springendmodule.formation.dtos;

import com.springendmodule.formation.entities.Planning;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@NoArgsConstructor @AllArgsConstructor 
@Data
public class EntrepriseDTO implements Serializable {
	
	private Long id;
	
	private String name;
	
	private String address;
	
	private String phone;
	
	private String url;
	
	private String email;

}
