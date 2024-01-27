package com.springendmodule.formation.controllers;

import com.springendmodule.formation.dtos.IndividualDto;
import com.springendmodule.formation.dtos.UserDto;
import com.springendmodule.formation.entities.Individual;
import com.springendmodule.formation.entities.User;
import com.springendmodule.formation.mappers.IndividualMapper;
import com.springendmodule.formation.mappers.UserMapper;
import com.springendmodule.formation.servies.IndividualService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/individual")
@CrossOrigin(origins = "*")
public class IndividualController {

    @Autowired
    IndividualService service;
    @Autowired
    IndividualMapper individualMapper;

    @PostMapping("/add")
    public Individual addNewUser(@RequestBody IndividualDto individualDto) {
        Individual individual = individualMapper.fromIndividualDTO(individualDto);
        Individual addedIndividual  = service.addIndividual(individual);
        System.out.println("added individual is : "+addedIndividual);
        return addedIndividual;
    }

    @GetMapping("/{id}")
    public IndividualDto getOne(@PathVariable Integer id ){
        IndividualDto individualDto = individualMapper.fromUser(service.getIndividualById(id));
        return  individualDto;
    }
    
    @GetMapping("{name}/{email}")
    public Individual getByNameAndEmail(@PathVariable String name,@PathVariable String email ) {
    	return service.getByNameAndEmail(name, email).get(0);
    }
    
    
    @GetMapping("/all")
    public List<IndividualDto> getAllUsers(){
        List <IndividualDto> individualsDto = new ArrayList<IndividualDto>();
        List <Individual> individuals  = service.getAllUsers();
        for (Individual individual : individuals){
            individualsDto.add(individualMapper.fromUser(individual));
        }
        return individualsDto;
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody IndividualDto individualDto){
        Individual individual = this.individualMapper.fromIndividualDTO(individualDto);
        service.updateIndividual(individual);
        return new ResponseEntity<String>("user updated successfully",HttpStatusCode.valueOf(200));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id){

        service.deleteIndividual(id);
        return new ResponseEntity<String>("user deleted successfully",HttpStatusCode.valueOf(200));
    }

}
