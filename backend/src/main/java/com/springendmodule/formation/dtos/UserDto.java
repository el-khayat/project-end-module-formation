package com.springendmodule.formation.dtos;

import java.util.List;

import com.springendmodule.formation.entities.Feedback;
import com.springendmodule.formation.entities.Formation;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class UserDto {
	
    private Integer id;
    
    private String name;
    
    private String email;
    
    private String phone;
    
    private String roles;
    
    private String keywords ;
    
    private List<Formation> formations;
    
    private List<Feedback> feedbacks;
}
