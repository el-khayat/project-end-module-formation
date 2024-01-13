package com.springendmodule.formation.dtos;

import lombok.*;

import java.util.Date;

@Data
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class IndividualDto {
    private Integer id;
    private String name;
    private String email;
    private String phone;
    private String city;
    private Date birthday;
}
