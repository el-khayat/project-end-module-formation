package com.springendmodule.formation.controllers;

import com.springendmodule.formation.dtos.UserCreateDTO;
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
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired UserService service;
    @Autowired UserMapper userMapper;



    @PostMapping("/addUser")
    @PreAuthorize("hasAuthority('ADMIN_ROLE')")
    public User addNewUser(@RequestBody UserCreateDTO userInfo) {
        User user = userMapper.fromUserCreateDtoToUser(userInfo);
        return service.addUser(user);
    }
    
    
    @PostMapping("formateur/eternal/add")
    public ResponseEntity<User> addExternalFormateur(@RequestBody UserCreateDTO userInfo) {
        User user = userMapper.fromUserCreateDtoToUser(userInfo);
        return new ResponseEntity<>(service.addUser(user),HttpStatusCode.valueOf(200));
    }
    
    @GetMapping("/{id}")
    public UserDto getOne(@PathVariable Integer id ){
        UserDto userDto = userMapper.fromUser(service.getUserById(id));
        return  userDto;
    }

    @GetMapping("/all")
    public List<UserDto> getAllUsers(){
        List <UserDto> usersDto = new ArrayList<UserDto>();
        List <User> users  = service.getAllUsers();
        for (User user : users){
            usersDto.add(userMapper.fromUser(user));
        }
        return usersDto;
    }

    @PutMapping("/update")
    @PreAuthorize("hasAuthority('ADMIN_ROLE')")
    public ResponseEntity<User> update(@RequestBody UserCreateDTO userInfo) {
        User user = userMapper.fromUserCreateDtoToUser(userInfo);
        System.out.println("Received update request: " + userInfo.toString());
        return  new ResponseEntity<>(service.addUser(user),HttpStatusCode.valueOf(200)) ;
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN_ROLE')")
    public ResponseEntity<String> delete(@PathVariable Integer id){
      service.deleteUser(id);
      return new ResponseEntity<String>("user deleted successfully", HttpStatusCode.valueOf(200));
    }


    @GetMapping("/formateurs")
    @PreAuthorize("hasAuthority('ADMIN_ROLE')")
    public ResponseEntity<List<UserDto>> getAllformateurs(){
    	System.out.println("Request received for /user/formateurs");
    	List<UserDto> dtos=service.getAllFormateurs("FORMATEUR_ROLE");
    	return  new ResponseEntity<>(dtos,HttpStatusCode.valueOf(200));
    }


    @GetMapping("/formateurs/external")
    @PreAuthorize("hasAuthority('ADMIN_ROLE') or hasAuthority('ASSISTANT_ROLE')")
    public ResponseEntity<List<UserDto>> getAllExternalFormateurs(){
    	List<UserDto> dtos=service.getAllFormateurs("EXTERNE_FORMATEUR_ROLE");
    	return  new ResponseEntity<>(dtos,HttpStatusCode.valueOf(200));
    }
    
    @PutMapping("/update/role/{id}/{role}") 
    @PreAuthorize("hasAuthority('ADMIN_ROLE')")
    public ResponseEntity<UserDto> updateRole(@PathVariable Integer id,@PathVariable String role) {
    	return new ResponseEntity<>(userMapper.fromUser(service.updateUserByRole(id, role)) ,HttpStatusCode.valueOf(200));
    }
    
    @GetMapping("/userProfile")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public String userProfile() { return "Welcome to User Profile"; }



}
