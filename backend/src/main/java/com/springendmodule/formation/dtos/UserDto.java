package com.springendmodule.formation.dtos;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class UserDto {
    private Integer id;
    private String name;
    private String email;

    private String phone;
    private String roles;
    private String keywords ;
}
