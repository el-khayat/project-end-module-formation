package com.springendmodule.formation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springendmodule.formation.entities.Formation;

@Repository
public interface FormationRepository extends JpaRepository<Formation, Long>{

}
