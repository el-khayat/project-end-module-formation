package com.springendmodule.formation.controllers;

import com.springendmodule.formation.dtos.EntrepriseDTO;
import com.springendmodule.formation.dtos.IndividualDto;
import com.springendmodule.formation.dtos.PlanningCreateDto;
import com.springendmodule.formation.dtos.PlanningDto;
import com.springendmodule.formation.entities.*;
import com.springendmodule.formation.mappers.*;
import com.springendmodule.formation.servies.*;
import jakarta.persistence.Transient;
import org.apache.catalina.mapper.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/planning")
@CrossOrigin(origins = "*")
public class PlanningController {

    @Autowired
    PlanningService service;

    @Autowired
    EntrepriseService entrepriseService ;

    @Autowired
    FormationService formationService ;

    @Autowired
    UserService userService ;

    @Autowired
    PlanningMapper planningMapper;

    @Autowired
    EntrepriseMapper entrepriseMapper ;

    @Autowired
    UserMapper userMapper ;

    @Autowired
    FormationMapper formationMapper ;


    @Transient
    private UUID corrId = UUID.randomUUID();

    @PostMapping("/save")
    public Planning addNewPlanning(@RequestBody PlanningCreateDto planningCreateDto) {

        System.out.println("planning incoming : "+planningCreateDto);

       // Planning planning = planningMapper.fromPlanningCreateDtoToPlanning(planningCreateDto);
        Planning planning = new Planning();
        planning.setEnd(planningCreateDto.getEnd());
        planning.setStart(planningCreateDto.getStart());
        planning.setTitle(planningCreateDto.getTitle());

        System.out.println("interprise id is :"+planningCreateDto.getEntreprise_id());
        EntrepriseDTO entrepriseDto =   entrepriseService.getById(planningCreateDto.getEntreprise_id());
        System.out.println("interprise Dto  is : "+entrepriseDto);

        Entreprise entreprise  = entrepriseMapper.fromEntropriseDTO(entrepriseDto);
        System.out.println("interprise  is :"+entreprise);


        System.out.println("user  id is :"+planningCreateDto.getUser_id());
        User user    = userService.getUserById(planningCreateDto.getUser_id());
        System.out.println("user  is :"+user);

        System.out.println("formation  id is :"+planningCreateDto.getFormation_id());
        Formation formation = formationMapper.fromFormationDTO(formationService.getById(planningCreateDto.getFormation_id()));
        System.out.println("formation  is :"+formation);


        planning.setFormation(formation);

        planning.setUser(user);

        planning.setEntreprise(entreprise);
        System.out.println("planning begore save : "+planning);
        System.out.println("######################################");

        entrepriseService.update(entrepriseMapper.fromEntreprise(entreprise));
        formationService.update(formationMapper.fromFormation(formation));
        entrepriseService.update(entrepriseMapper.fromEntreprise(entreprise));
        Planning planning1 = service.add(planning) ;
        return planning1;
    }

    @GetMapping("/{id}")
    public PlanningDto getOne(@PathVariable Integer id ){
        Planning planning =service.getPlanningById(id);
        PlanningDto planningDto =   planningMapper.fromPlanning(planning);

        planningDto.setUser(userMapper.fromUser(planning.getUser()));
        planningDto.setEntreprise(entrepriseMapper.fromEntreprise(planning.getEntreprise()));
        planningDto.setFormation(formationMapper.fromFormation(planning.getFormation()));

        return  planningDto;
    }

    @GetMapping("/all")
    public ResponseEntity< List <PlanningDto>> getAllPlannings(){

        List <PlanningDto> planningsDto = new ArrayList<PlanningDto>();


        List <Planning> plannings  = service.getAllPlannings();

        for (Planning planning : plannings){
            PlanningDto planningDto = planningMapper.fromPlanning(planning);
            planningDto.setUser(userMapper.fromUser(planning.getUser()));
            planningDto.setEntreprise(entrepriseMapper.fromEntreprise(planning.getEntreprise()));
            planningDto.setFormation(formationMapper.fromFormation(planning.getFormation()));
            planningsDto.add(planningDto);

        }
        System.out.println("##########################3");

        return new ResponseEntity< List <PlanningDto>>(planningsDto,HttpStatusCode.valueOf(200));
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody PlanningDto planningDto){
        Planning planning = this.planningMapper.fromPlanningDTO(planningDto);
        service.updatePlanning(planning);
        return new ResponseEntity<String>("user updated successfully",HttpStatusCode.valueOf(200));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id){

        service.deletePlanning(id);
        return new ResponseEntity<String>("user deleted successfully",HttpStatusCode.valueOf(200));
    }

}
