package com.springendmodule.formation.servies;

import com.springendmodule.formation.entities.Formation;
import com.springendmodule.formation.entities.Individual;
import com.springendmodule.formation.repositories.IndividualRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Transactional
public class IndividualService  {
    @Autowired
    IndividualRepository repository;

    @Transactional
    public Individual addIndividual(Individual individual) {
        Individual savedIndividual = repository.save(individual);
        List<Formation> formations=savedIndividual.getFormations();
        System.out.println(formations.size());
        for(Formation f:formations) {
        	
        	System.out.println(f.getId());
        }
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
