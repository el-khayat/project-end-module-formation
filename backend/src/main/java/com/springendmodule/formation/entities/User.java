package com.springendmodule.formation.entities;


import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.*;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor
@Setter
@Getter
public class User {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String name;
    
    private String email;
    
    private String password;
    
    private String phone;
    
    private String roles; //  ADMIN_ROLE, FORMATEUR_ROLE, ASSISTANT_ROLE, EXTERNE_FORMATEUR_ROLE
    
    private String keywords ;
    
    
    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Formation> formations;
    
    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Feedback> feedbacks;

}

