package com.springendmodule.formation.controllers;


import com.springendmodule.formation.dtos.AuthRequest;
import com.springendmodule.formation.dtos.AuthResponse;
import com.springendmodule.formation.dtos.UserDto;
import com.springendmodule.formation.entities.User;
import com.springendmodule.formation.mappers.UserMapper;
import com.springendmodule.formation.servies.JwtService;
import com.springendmodule.formation.servies.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    @Autowired
    UserService service;
    @Autowired
    JwtService jwtService;
    @Autowired
    UserMapper userMapper ;
    @Autowired AuthenticationManager authenticationManager;

    @GetMapping("/open-end-point")
    public String hello() {return "Welcome this endpoint is public";}

    @GetMapping("/secure-end-point")
    public String welcome() {return "Welcome this endpoint is secure";}

    @GetMapping("/test")
    public String test() {return "example with git";}


    @PostMapping("/generateToken")
    public ResponseEntity< AuthResponse > xamauthenticateAndGetToken(@RequestBody AuthRequest authRequest) {
        System.out.println("generating token");
        System.out.println("request body "+authRequest);
        UserDto userDto = new UserDto();
        String token = "";
        AuthResponse authResponse = null;
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

        if(authentication != null ){
            System.out.println("user founded ");
            System.out.println("user name is "+authentication.getName());
            User user = service.getUserByName(authentication.getName());
            userDto = userMapper.fromUser(user);
            token = jwtService.generateToken(authRequest.getUsername());
            authResponse = new AuthResponse(token,userDto);
        }
        if (authentication.isAuthenticated()) {
            return new ResponseEntity< AuthResponse >(authResponse, HttpStatusCode.valueOf(200));
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }
}