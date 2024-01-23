package com.springendmodule.formation.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor @Data
public class UserCreateDTO {
	
	private Integer id;
    private String name;
    private String email;
    private String password;
    private String phone;
    private String roles;
    private String keywords ;

}
