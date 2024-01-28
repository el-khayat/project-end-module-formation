package com.springendmodule.formation.entities;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor
@Setter
@Getter
public class Individual implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    private String name;
    
    private String email;
    
    private String phone;
    
    private String city;
    
    private Date birthday;
    
    @ManyToMany
    @JoinTable(
        name = "formations_individuals",
        joinColumns = @JoinColumn(name = "individual_id"),
        inverseJoinColumns = @JoinColumn(name = "formation_id"))
    @JsonIgnore
    private List<Formation> formations=new ArrayList<>();
    
    @OneToMany(mappedBy = "individual")
    @JsonIgnore
    private List<Feedback> feedbacks;
}

