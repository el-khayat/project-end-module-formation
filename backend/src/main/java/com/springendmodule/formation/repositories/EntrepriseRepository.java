package com.springendmodule.formation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springendmodule.formation.entities.Entreprise;

@Repository
public interface EntrepriseRepository extends JpaRepository<Entreprise, Long>{

}
