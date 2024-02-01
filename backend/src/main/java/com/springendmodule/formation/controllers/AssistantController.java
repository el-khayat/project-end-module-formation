package com.springendmodule.formation.controllers;

import com.springendmodule.formation.dtos.UserDto;
import com.springendmodule.formation.entities.User;
import com.springendmodule.formation.mappers.UserMapper;
import com.springendmodule.formation.servies.EmailService;
import com.springendmodule.formation.servies.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/assistant")
@CrossOrigin(origins = "*")
public class AssistantController {

    @Autowired UserService service;
    @Autowired UserMapper userMapper;

    @Autowired
    EmailService emailService ;

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN_ROLE')")
    public User addNewUser(@RequestBody UserDto userInfo) {
        User user = userMapper.fromUserDTO(userInfo);
        String randomPassword = UUID.randomUUID().toString().replace("-", "").substring(0, 10);
        user.setPassword(randomPassword);

        String body = "Hi "+user.getName()+",\n"
                +"We hope this email find you well, we are thir" ;
        body = "Hi "+user.getName()+",\n" +
                "\n" +
                "We trust this email finds you in good health.\n" +
                "\n" +
                "We are thrilled to inform you that you are now one of our Assistants, and your account on our platform is ready. Please find below your login information:\n" +
                "\n" +
                "Username: "+user.getName()+"\n" +
                "Password: "+user.getPassword()+"\n\n" +
                "Best regards,\n" +
                "\n" +
                "Mohamed EL KHAYAT\n" +
                "ADMINISTRATION DEPARTEMENT\n" +
                " My Center \n" +
                "\n" +
                "Note: This is an automated email. Please don't reply to it." ;
        emailService.sendSimpleEmail(user.getEmail(),"Welcome to Our Training Platform - Your Login Information",body);
        user.setRoles("ASSISTANT_ROLE");
        return service.addUser(user);
    }
    

    @PreAuthorize("hasAuthority('ADMIN_ROLE')")
    @GetMapping("/{id}")
    public UserDto getOne(@PathVariable Integer id ){
        UserDto userDto = userMapper.fromUser(service.getUserById(id));
        return  userDto;
    }

    @PreAuthorize("hasAuthority('ADMIN_ROLE')")
    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAllUsers(){
    	
        List <UserDto> users  = service.getAllFormateurs("ASSISTANT_ROLE");
        return  new ResponseEntity<>(users,HttpStatusCode.valueOf(200));
    }

    @PutMapping("/update")
    @PreAuthorize("hasAuthority('ADMIN_ROLE')")
    public ResponseEntity<String> update(@RequestBody UserDto userDto){
    	User user = service.getUserById(userDto.getId());
    	if(userDto.getEmail() != null){
            user.setEmail(userDto.getEmail());
        }
        if(userDto.getName() != null){
            user.setName(userDto.getName());
        }
        if(userDto.getPhone() != null){
            user.setPhone(userDto.getPhone());
        }
        if(userDto.getKeywords() != null){
            user.setKeywords(userDto.getKeywords());
        }
        service.updateUser(user);
        return new ResponseEntity<String>("user updated successfully",HttpStatusCode.valueOf(200));
    }

    @PreAuthorize("hasAuthority('ADMIN_ROLE')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id){

        service.deleteUser(id);
        return new ResponseEntity<String>("user deleted successfully",HttpStatusCode.valueOf(200));
    }

    @GetMapping("/userProfile")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public String userProfile() { return "Welcome to User Profile"; }

}
