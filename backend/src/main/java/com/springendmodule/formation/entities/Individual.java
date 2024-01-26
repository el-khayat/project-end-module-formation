package com.springendmodule.formation.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

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
}

