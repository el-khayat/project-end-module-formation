package com.springendmodule.formation.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data @AllArgsConstructor @NoArgsConstructor
public class AuthRequest implements Serializable {
    private String username;
    private String password;
}
