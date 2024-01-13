package com.springendmodule.formation.mappers;


import com.springendmodule.formation.dtos.IndividualDto;
import com.springendmodule.formation.dtos.UserDto;
import com.springendmodule.formation.entities.Individual;
import com.springendmodule.formation.entities.User;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class IndividualMapper {
    public Individual fromIndividualDTO(IndividualDto individualDto) {

        Individual individual  =new Individual();
        BeanUtils.copyProperties(individualDto, individual);
        return individual;
    }

    public IndividualDto fromUser(Individual individual) {

        IndividualDto individualDto =new IndividualDto();
        BeanUtils.copyProperties(individual, individualDto);
        return individualDto;
    }
}
