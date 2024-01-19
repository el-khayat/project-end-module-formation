package com.springendmodule.formation.mappers;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.springendmodule.formation.dtos.FeedbackDTO;
import com.springendmodule.formation.entities.Feedback;

@Service
public class FeedbackMapper {
	
	public Feedback fromFeedbackDTO(FeedbackDTO feedbackDTO) {
		
		Feedback feedback=new Feedback();
		BeanUtils.copyProperties(feedbackDTO, feedback);
		return feedback;
		
	}
	
	public FeedbackDTO fromFeedback(Feedback feedback) {
		
		FeedbackDTO feedbackDTO=new FeedbackDTO();
		BeanUtils.copyProperties(feedback, feedbackDTO);
		return feedbackDTO;
		
	}

}
