package com.springendmodule.formation.dtos;

import java.util.List;

import com.springendmodule.formation.entities.Feedback;
import com.springendmodule.formation.entities.Formation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor @Data
public class UserCreateDTO {
	
	private Integer id;
	
    private String name;
    
    private String email;
    
    private String password;
    
    private String phone;
    
    private String roles;
    
    private String keywords ;
    
    private List<Formation> formations;
    
    private List<Feedback> feedbacks;

}
