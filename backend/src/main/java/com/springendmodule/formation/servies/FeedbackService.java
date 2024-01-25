package com.springendmodule.formation.servies;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springendmodule.formation.dtos.FeedbackDTO;
import com.springendmodule.formation.entities.Feedback;
import com.springendmodule.formation.mappers.EntrepriseMapper;
import com.springendmodule.formation.mappers.FeedbackMapper;
import com.springendmodule.formation.repositories.FeedbackRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class FeedbackService {

	@Autowired
	FeedbackRepository feedbackRepository;

	@Autowired
	FeedbackMapper feedbackMapper;

	public List<FeedbackDTO> getAllFeedback() {

		List<Feedback> feedbacks = feedbackRepository.findAll();
		List<FeedbackDTO> feedbackDTOs = feedbacks.stream().map(feed -> feedbackMapper.fromFeedback(feed))
				.collect(Collectors.toList());
		return feedbackDTOs;

	}

	public FeedbackDTO getById(Long id) {

		Feedback feedback = feedbackRepository.findById(id).orElse(null);
		FeedbackDTO feedbackDTO = feedbackMapper.fromFeedback(feedback);
		return feedbackDTO;

	}

	public FeedbackDTO save(FeedbackDTO feedbackDTO) {

		Feedback feedback = feedbackMapper.fromFeedbackDTO(feedbackDTO);
		feedbackRepository.save(feedback);
		return feedbackDTO;

	}

	public FeedbackDTO update(FeedbackDTO feedbackDTO) {

		Feedback feedback = feedbackMapper.fromFeedbackDTO(feedbackDTO);
		feedbackRepository.save(feedback);
		return feedbackDTO;

	}
	
	public void deleteById(Long id) {
		
		feedbackRepository.deleteById(id);
		
	}
	
}
