package com.springendmodule.formation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springendmodule.formation.entities.Feedback;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long>{

}
