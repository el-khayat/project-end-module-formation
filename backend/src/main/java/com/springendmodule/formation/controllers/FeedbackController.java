package com.springendmodule.formation.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springendmodule.formation.dtos.FeedbackDTO;
import com.springendmodule.formation.servies.FeedbackService;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

	@Autowired
	FeedbackService feedbackService;

	@GetMapping("/all")
	public List<FeedbackDTO> getAllFeedBack() {
		return feedbackService.getAllFeedback();
	}

	@GetMapping("/{id}")
	public FeedbackDTO getById(@PathVariable Long id) {
		return feedbackService.getById(id);
	}

	@PostMapping("/save")
	public FeedbackDTO save(@RequestBody FeedbackDTO feedbackDTO) {
		return feedbackService.save(feedbackDTO);
	}

	@PutMapping("/update")
	public FeedbackDTO update(@RequestBody FeedbackDTO feedbackDTO) {
		return feedbackService.update(feedbackDTO);
	}

	@DeleteMapping("/delete/{id}")
	public void deleteById(@PathVariable Long id) {
		feedbackService.deleteById(id);
	}

}
