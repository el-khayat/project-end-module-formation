package com.springendmodule.formation.dtos;

import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.springendmodule.formation.entities.Feedback;
import com.springendmodule.formation.entities.Formation;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class IndividualDto implements Serializable {
    private Integer id;
    
    private String name;
    
    private String email;
    
    private String phone;
    
    private String city;
    
    private Date birthday;
    
    private List<Formation> formations;
    
    private List<Feedback> feedbacks;
}
