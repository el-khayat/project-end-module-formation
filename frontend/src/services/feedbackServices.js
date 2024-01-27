
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const FeedbackService = {
 
  createFeedback: async (feedbackData) => {
    try {
      console.log("this is what passing\n",feedbackData);
      const response = await axios.post(`${BASE_URL}/feedback/save`, feedbackData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating feedback:', error);
      throw error;
    }
  },
  getIndividualById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/individual/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      return await response.data;
    } catch (error) {
      console.error('Error fetching individual:', error);
      throw error;
    }
  },
   checkIfFeedbackAlreadySubmited : async (code) =>{
    const data = {
      code:code
    }
    try {
      const response = await axios.post("http://localhost:8080/feedback/exist",data, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error checking the feedback existance:', error.response);
    }
  }

  
};

export default FeedbackService;
