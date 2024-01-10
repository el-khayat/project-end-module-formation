package com.springendmodule.formation.controllers;


import com.springendmodule.formation.models.AuthRequest;
import com.springendmodule.formation.models.User;
import com.springendmodule.formation.servies.JwtService;
import com.springendmodule.formation.servies.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    UserService service;
    @Autowired
    JwtService jwtService;
    @Autowired AuthenticationManager authenticationManager;

    @GetMapping("/open-end-point")
    public String hello() {return "Welcome this endpoint is public";}

    @GetMapping("/secure-end-point")
    public String welcome() {return "Welcome this endpoint is secure";}

    @GetMapping("/test")
    public String test() {return "example with git";}


    @PostMapping("/generateToken")
    public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        System.out.println("generating token");
        System.out.println("request body "+authRequest);

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if(authentication != null ){
            System.out.println("user founded ");
            System.out.println("user name is "+authentication.getName());
        }
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getUsername());
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }
}