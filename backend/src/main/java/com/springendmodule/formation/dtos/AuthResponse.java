package com.springendmodule.formation.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data @AllArgsConstructor @NoArgsConstructor
public class AuthResponse {
    private String token;
    private UserDto user;
}
