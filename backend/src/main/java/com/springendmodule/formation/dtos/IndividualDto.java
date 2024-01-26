package com.springendmodule.formation.dtos;

import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Data
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class IndividualDto implements Serializable {
    private Integer id;
    private String name;
    private String email;
    private String phone;
    private String city;
    private Date birthday;
}
