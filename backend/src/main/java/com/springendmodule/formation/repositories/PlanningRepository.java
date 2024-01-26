package com.springendmodule.formation.repositories;

import com.springendmodule.formation.entities.Planning;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanningRepository extends JpaRepository<Planning, Integer> {

}
