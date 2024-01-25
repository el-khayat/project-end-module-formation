package com.springendmodule.formation.entities;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor
public class Individual {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String name;
    
    private String email;
    
    private String phone;
    
    private String city;
    
    private Date birthday;
    
    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH, CascadeType.REMOVE}, mappedBy = "individuals")
    private List<Formation> formations=new ArrayList<>();
    
    @OneToMany(mappedBy = "individual")
    @JsonIgnore
    private List<Feedback> feedbacks;
}

