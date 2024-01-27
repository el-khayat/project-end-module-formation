package com.springendmodule.formation.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Formation implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private int numberHours;
	
	private double price;
	
	private String descreption;
	
	private String subject;
	
	private String city;
	
	private Date date;
	
	@ManyToOne
	@JoinColumn(name="category_id" )
	private Category category;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
	@JsonIgnore
	private List<Individual> individuals=new ArrayList<>();

}
