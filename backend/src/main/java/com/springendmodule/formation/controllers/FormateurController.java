package com.springendmodule.formation.controllers;

import com.springendmodule.formation.dtos.UserDto;
import com.springendmodule.formation.entities.User;
import com.springendmodule.formation.mappers.UserMapper;
import com.springendmodule.formation.servies.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/formateur")
@CrossOrigin(origins = "*")
public class FormateurController {

    @Autowired UserService service;
    @Autowired UserMapper userMapper;

    @PreAuthorize("hasAuthority('ADMIN_ROLE,ASSISTANT_ROLE')")
    @PostMapping("/add")
    public User addNewUser(@RequestBody UserDto userInfo) {
        User user = userMapper.fromUserDTO(userInfo);
        user.setRoles("FORMATEUR_ROLE");
        return service.addUser(user);
    }

    @PreAuthorize("hasAuthority('ADMIN_ROLE,ASSISTANT_ROLE')")
    @GetMapping("/{id}")
    public UserDto getOne(@PathVariable Integer id ){
        UserDto userDto = userMapper.fromUser(service.getUserById(id));
        return  userDto;
    }

    @PreAuthorize("hasAuthority('ADMIN_ROLE,ASSISTANT_ROLE')")
    @GetMapping("/all")
    public List<UserDto> getAllUsers(){
        List <UserDto> usersDto = new ArrayList<UserDto>();
        List <User> users  = service.getAllUsers();
        for (User user : users){
            usersDto.add(userMapper.fromUser(user));
        }
        return usersDto;
    }

    @PreAuthorize("hasAuthority('ADMIN_ROLE,ASSISTANT_ROLE')")
    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody UserDto userDto){
        User user = this.userMapper.fromUserDTO(userDto);
        service.updateUser(user);
        return new ResponseEntity<String>("user updated successfully",HttpStatusCode.valueOf(200));
    }

    @PreAuthorize("hasAuthority('ADMIN_ROLE,ASSISTANT_ROLE')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id){

        service.deleteUser(id);
        return new ResponseEntity<String>("user deleted successfully",HttpStatusCode.valueOf(200));
    }





    @GetMapping("/userProfile")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public String userProfile() { return "Welcome to User Profile"; }



}
