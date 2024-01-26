package com.springendmodule.formation.dtos;

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
public class PlanningCreateDto implements Serializable {

    private Integer id;
    private String title;
    private Date start;
    private Date end ;

    private Integer user_id;
    private Long formation_id;
    private Long entreprise_id ;

}
