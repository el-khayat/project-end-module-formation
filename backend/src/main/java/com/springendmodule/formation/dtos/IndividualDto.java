package com.springendmodule.formation.dtos;

import lombok.*;

import java.util.Date;
import java.util.List;

import com.springendmodule.formation.entities.Feedback;
import com.springendmodule.formation.entities.Formation;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IndividualDto {
	
    private Integer id;
    
    private String name;
    
    private String email;
    
    private String phone;
    
    private String city;
    
    private Date birthday;
    
    private List<Formation> formations;
    
    private List<Feedback> feedbacks;
}
