package com.springendmodule.formation.controllers;

import java.util.ArrayList;
import java.util.List;

import com.springendmodule.formation.entities.Formation;
import com.springendmodule.formation.entities.Individual;
import com.springendmodule.formation.entities.User;
import com.springendmodule.formation.servies.EmailService;
import com.springendmodule.formation.servies.EncryptionService;
import com.springendmodule.formation.servies.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springendmodule.formation.dtos.FormationDTO;
import com.springendmodule.formation.servies.FormationService;

@RestController
@RequestMapping("/formation")
@CrossOrigin(origins = "*") 
public class FormationController {
	
	@Autowired
	FormationService formationService;

	@Autowired
	UserService userService ;

	@Autowired
	EmailService emailService ;

	@Autowired
	EncryptionService encryptionService ;

	@GetMapping("/{formation_id}/send-feedback-form")
	public void sendFeedbackFormMail(@PathVariable Long formation_id ) throws Exception {

		System.out.println("sending emails to individuals ....");
		FormationDTO formation = this.getById(formation_id);
		Integer id_formateur = formation.getUser().getId();

		for(Individual individual : formation.getIndividuals()){
			String subject = "Feedback on the Formateur";
			String token = "formateurId="+id_formateur+"&individualId="+individual.getId()+"&formationId="+formation_id ;
			token = encryptionService.encrypt(token);
			String link = "http://localhost:3000/feedback?token="+token;
			String body = "please let a feedback on your foramteur via the link below "+link;

			emailService.sendSimpleEmail(individual.getEmail(),subject,body);
		}
	}

	@GetMapping("/test-mail")
	public void testMail() throws Exception {

		/*
		*
		* 	this method just for a simple test
		* 	the method above will be used for sending the mails
		*
		* */

		Long formation_id = 2l;

			String subject = "Feedback on the Formateur";
			String token = "formateurId="+3+"&individualId="+6+"&formationId="+formation_id ;
			token = encryptionService.encrypt(token);
			String link = "http://localhost:3000/feedback?token="+token;
			String body = "please let a feedback on your foramteur via the link below \n"+link;

			emailService.sendSimpleEmail("mohamed.elkhayat5@etu.uae.ac.ma",subject,body);

	}
	@GetMapping("/all")
	public List<FormationDTO> getAllFormation(){
		return formationService.getAllFormation();
	}
	
	@GetMapping("/available")
	public List<FormationDTO> getAvailableFormation(){
		return formationService.getAvailableFormation();
	}
	
	@GetMapping("{id}")
	public FormationDTO getById(@PathVariable Long id) {
		return formationService.getById(id);
	}
	//formationService.getById(id).getIndividuals().size()
	@PostMapping("/save")
	public FormationDTO save(@RequestBody FormationDTO formationDTO) {
		return formationService.save(formationDTO);
	}
	
	@PutMapping("/update")
	public FormationDTO update(@RequestBody FormationDTO formationDTO) {
		System.out.println(formationDTO);
		return formationService.update(formationDTO);
	}
	@PutMapping("/assignFormateur/{formationId}/{formateurId}")
	public void assignFormatuer( @PathVariable Long formationId,  @PathVariable Integer formateurId){
		System.out.println("assiging formateur ...");
		System.out.println("#######\n#######################\n##################");
		FormationDTO formation = this.formationService.getById(formationId) ;
		User user = userService.getUserById( formateurId);
		formation.setUser(user);
		formationService.update(formation);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteById(@PathVariable Long id) {
		formationService.deleteById(id);
	}

}