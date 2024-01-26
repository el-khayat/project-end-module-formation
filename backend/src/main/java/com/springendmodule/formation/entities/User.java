package com.springendmodule.formation.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor
@Setter
@Getter
public class User implements Serializable {
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

