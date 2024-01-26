package com.springendmodule.formation.dtos;

import com.springendmodule.formation.entities.Planning;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class UserDto implements Serializable {
    private Integer id;
    private String name;
    private String email;
    
    private String phone;
    private String roles;
    private String keywords ;
}
