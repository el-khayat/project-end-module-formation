package com.springendmodule.formation.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data @AllArgsConstructor @NoArgsConstructor
public class AuthResponse implements Serializable {
    private String token;
    private UserDto user;
}
