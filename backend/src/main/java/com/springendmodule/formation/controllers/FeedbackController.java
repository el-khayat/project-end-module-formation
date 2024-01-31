package com.springendmodule.formation.controllers;

import java.util.ArrayList;
import java.util.List;

import com.springendmodule.formation.dtos.FeedbackCreateDTO;
import com.springendmodule.formation.dtos.FeedbackExistDTO;
import com.springendmodule.formation.dtos.FeedbackResponseDTO;
import com.springendmodule.formation.entities.Feedback;
import com.springendmodule.formation.entities.Individual;
import com.springendmodule.formation.entities.User;
import com.springendmodule.formation.mappers.FeedbackMapper;
import com.springendmodule.formation.servies.IndividualService;
import com.springendmodule.formation.servies.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.springendmodule.formation.dtos.FeedbackDTO;
import com.springendmodule.formation.servies.FeedbackService;

@RestController
@RequestMapping("/feedback")
@CrossOrigin(origins = "*")
public class FeedbackController {

	@Autowired
	FeedbackService feedbackService;
	@Autowired
	FeedbackMapper feedbackMapper;
	@Autowired
	UserService userService ;

	@Autowired
	IndividualService individualService ;

	@GetMapping("/all")
	public List<FeedbackResponseDTO> getAllFeedBack() {
		List<FeedbackResponseDTO> feedbackResponseDTOs  = new ArrayList<>();
		for(FeedbackDTO feedbackDTO :feedbackService.getAllFeedback()){
			feedbackResponseDTOs.add(feedbackMapper.fromFeedbackDtoToRespnose(feedbackDTO));
		}
		return feedbackResponseDTOs;
	}

	@GetMapping("/{id}")
	public FeedbackResponseDTO getById(@PathVariable Long id) {
		return feedbackMapper.fromFeedbackDtoToRespnose(feedbackService.getById(id)) ;
	}

	@PostMapping("/save")
	public FeedbackResponseDTO save(@RequestBody FeedbackCreateDTO feedback) {
		System.out.println("the comming feedback is : "+feedback);

		FeedbackDTO feedbackDTO = new FeedbackDTO ();
		feedbackDTO.setNote(feedback.getNote());
		feedbackDTO.setMessage(feedback.getMessage());
		feedbackDTO.setCode(feedback.getCode());
		User formateur = userService.getUserById(feedback.getUser());
		Individual individual = individualService.getIndividualById(feedback.getIndividual());

		feedbackDTO.setUser(formateur);
		feedbackDTO.setIndividual(individual);

		formateur.getFeedbacks().add(feedbackMapper.fromFeedbackDTO(feedbackDTO));
		individual.getFeedbacks().add(feedbackMapper.fromFeedbackDTO(feedbackDTO));
		userService.updateUser(formateur);
		individualService.updateIndividual(individual);

		FeedbackDTO feedbackDTO1 = feedbackService.save(feedbackDTO);
		return feedbackMapper.fromFeedbackDtoToRespnose(feedbackDTO1) ;
	}

	@PutMapping("/update")
	public FeedbackResponseDTO update(@RequestBody FeedbackDTO feedbackDTO) {
		return feedbackMapper.fromFeedbackDtoToRespnose(feedbackService.update(feedbackDTO));
	}

	@DeleteMapping("/delete/{id}")
	public void deleteById(@PathVariable Long id) {
		feedbackService.deleteById(id);
	}

	@PostMapping("/exist")
	public ResponseEntity<Boolean> exist(@RequestBody FeedbackExistDTO feedback){
		System.out.println("code is : "+feedback.getCode());
		System.out.println("############################################### ");
		FeedbackResponseDTO feedbackResponseDTO = feedbackService.getFeedbackByCode(feedback.getCode());
		if (feedbackResponseDTO != null){
			return new ResponseEntity<Boolean>(true, HttpStatusCode.valueOf(200));
		}
		return new ResponseEntity<Boolean>(false,HttpStatusCode.valueOf(200));
	}
}
