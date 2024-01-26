package com.springendmodule.formation.servies;

import com.springendmodule.formation.entities.Individual;
import com.springendmodule.formation.entities.Planning;
import com.springendmodule.formation.repositories.IndividualRepository;
import com.springendmodule.formation.repositories.PlanningRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PlanningService {
    @Autowired
    PlanningRepository repository;

    public Planning add(Planning planning) {
        Planning savedPlanning = repository.save(planning);
        return savedPlanning;
    }

    public void deletePlanning(Integer id){
        this.repository.deleteById(id);
    }

    public Planning getPlanningById(Integer id){
        return repository.findById(id).get();
    }
    public void updatePlanning(Planning newPlanning){

        repository.save(newPlanning);
    }
    public List<Planning> getAllPlannings(){
        return repository.findAll();
    }
}
