package com.springendmodule.formation.mappers;


import com.springendmodule.formation.dtos.PlanningCreateDto;
import com.springendmodule.formation.dtos.PlanningDto;
import com.springendmodule.formation.dtos.UserCreateDTO;
import com.springendmodule.formation.dtos.UserDto;
import com.springendmodule.formation.entities.Planning;
import com.springendmodule.formation.entities.User;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class PlanningMapper {
    public Planning fromPlanningDTO(PlanningDto planningDto) {

        Planning planning  =new Planning();
        BeanUtils.copyProperties(planningDto, planning);
        return planning;
    }

    public PlanningDto fromPlanning(Planning planning) {

        PlanningDto planningDto =new PlanningDto();
        BeanUtils.copyProperties(planning, planningDto);
        return planningDto;
    }

    public Planning fromPlanningCreateDtoToPlanning(PlanningCreateDto planningCreateDto){
        Planning planning = new Planning();
        BeanUtils.copyProperties(planningCreateDto, planning);
        return   planning;
    }

}
