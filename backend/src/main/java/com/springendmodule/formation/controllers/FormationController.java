package com.springendmodule.formation.controllers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.springendmodule.formation.entities.Formation;
import com.springendmodule.formation.entities.Individual;
import com.springendmodule.formation.entities.User;
import com.springendmodule.formation.servies.EmailService;
import com.springendmodule.formation.servies.EncryptionService;
import com.springendmodule.formation.servies.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.springendmodule.formation.dtos.FormationDTO;
import com.springendmodule.formation.servies.FormationService;

@RestController
@RequestMapping("/formation")
@CrossOrigin(origins = "*")
public class FormationController {

	@Autowired
	FormationService formationService;

	@Autowired
	UserService userService;

	@Autowired
	EmailService emailService;

	@Autowired
	EncryptionService encryptionService;

	@GetMapping("/{formation_id}/send-feedback-form")
	public void sendFeedbackFormMail(@PathVariable Long formation_id) throws Exception {

		System.out.println("sending emails to individuals ....");
		FormationDTO formation = this.getById(formation_id);
		Integer id_formateur = formation.getUser().getId();

		for (Individual individual : formation.getIndividuals()) {
			String subject = "Feedback on the Formateur";
			String token = "formateurId=" + id_formateur + "&individualId=" + individual.getId() + "&formationId="
					+ formation_id;
			token = encryptionService.encrypt(token);
			String link = "http://localhost:3000/feedback?token=" + token;
			String body = "please let a feedback on your foramteur via the link below " + link;

			emailService.sendSimpleEmail(individual.getEmail(), subject, body);
		}
	}

	@GetMapping("/test-mail")
	public void testMail() throws Exception {
		/*
		 *
		 * this method just for a simple test the method above will be used for sending
		 * the mails
		 *
		 */

		Long formation_id = 2l;

		String subject = "Feedback on the Formateur";
		String token = "formateurId=" + 6 + "&individualId=" + 7 + "&formationId=" + formation_id;
		token = encryptionService.encrypt(token);
		String link = "http://localhost:3000/feedback?token=" + token;
		String body = "please let a feedback on your foramteur via the link below \n" + link;

		emailService.sendSimpleEmail("mohamed.elkhayat5@etu.uae.ac.ma", subject, body);

	}

	@GetMapping("/all")
	public List<FormationDTO> getAllFormation() {
		return formationService.getAllFormation();
	}

	@GetMapping("/available")
	public List<FormationDTO> getAvailableFormation() {
		return formationService.getAvailableFormation();
	}

	@GetMapping("{id}")
	public FormationDTO getById(@PathVariable Long id) {
		return formationService.getById(id);
	}

	@PostMapping("/save")
	public ResponseEntity<FormationDTO> saveFormation(@ModelAttribute FormationDTO formationDTO,
			@RequestParam(name="image", required = false) MultipartFile image) {
		try {
			String imageName = null;
//			FormationDTO old=formationService.getById(formationDTO.getId());

			if (image != null && !image.isEmpty()) {
				imageName = saveImage(image);
				System.out.println("testing image");
			}
//			} else {
//				imageName="default.jpg";
//			}

			formationDTO.setPath(imageName);
			System.out.println(formationDTO.getUser());

			return new ResponseEntity<>(formationService.save(formationDTO), HttpStatusCode.valueOf(200));

		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/update")
	public ResponseEntity<FormationDTO> update(@ModelAttribute FormationDTO formationDTO,
			@RequestParam(name="image", required = false) MultipartFile image) {
		try {
			FormationDTO old=formationService.getById(formationDTO.getId());
			String imageName = null;

			if (image != null && !image.isEmpty()) {
				imageName = saveImage(image);
				formationDTO.setPath(imageName);
				System.out.println("testing image :" + formationDTO.getPath());
			}else if(old.getPath()!=null) {
				formationDTO.setPath(old.getPath());
			}

			System.out.println(formationDTO.getUser());

			return new ResponseEntity<>(formationService.update(formationDTO), HttpStatusCode.valueOf(200));

		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/assignFormateur/{formationId}/{formateurId}")
	public void assignFormatuer(@PathVariable Long formationId, @PathVariable Integer formateurId) {
		System.out.println("assiging formateur ...");
		System.out.println("#######\n#######################\n##################");
		FormationDTO formation = this.formationService.getById(formationId);
		User user = userService.getUserById(formateurId);
		formation.setUser(user);
		formationService.update(formation);
	}

	@DeleteMapping("/delete/{id}")
	public void deleteById(@PathVariable Long id) {
		formationService.deleteById(id);
	}

	private String saveImage(MultipartFile image) throws IOException {
		String originalFilename = image.getOriginalFilename();
		System.out.println(originalFilename);
		String imageName = UUID.randomUUID().toString() + "_" + originalFilename;
		String imageDirectory = "./src/main/resources/images";
		File directory = new File(imageDirectory);
		if (!directory.exists()) {
			directory.mkdirs();
		}
		Path filePath = Paths.get(imageDirectory, imageName);
		Files.write(filePath, image.getBytes());
		return imageName;
	}

}