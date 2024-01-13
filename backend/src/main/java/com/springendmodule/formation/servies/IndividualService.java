package com.springendmodule.formation.servies;


import com.springendmodule.formation.dtos.UserInfoDetails;
import com.springendmodule.formation.entities.Individual;
import com.springendmodule.formation.entities.User;
import com.springendmodule.formation.repositories.IndividualRepository;
import com.springendmodule.formation.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IndividualService  {
    @Autowired
    IndividualRepository repository;

    public Individual addIndividual(Individual individual) {
        Individual savedIndividual = repository.save(individual);
        return savedIndividual;
    }

    public void deleteIndividual(Integer id){
        this.repository.deleteById(id);
    }

    public Individual getIndividualById(Integer id){
        return repository.findById(id).get();
    }
    public void updateIndividual(Individual newIndividual){

        repository.save(newIndividual);
    }
    public List<Individual> getAllUsers(){
        return repository.findAll();
    }
}
