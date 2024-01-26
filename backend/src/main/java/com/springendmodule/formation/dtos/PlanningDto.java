package com.springendmodule.formation.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.springendmodule.formation.entities.Entreprise;
import com.springendmodule.formation.entities.Formation;
import com.springendmodule.formation.entities.User;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Data
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class PlanningDto implements Serializable {

    private Integer id;
    private String title;
    private Date start;
    private Date end ;

    private UserDto user;
    private FormationDTO formation;
    private EntrepriseDTO entreprise ;

}
