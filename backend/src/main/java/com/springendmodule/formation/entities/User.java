package com.springendmodule.formation.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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

}

