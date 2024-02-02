
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const FormationService = {
  getAllFormations: async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`${BASE_URL}/formation/all`, {
        headers: { Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      });
      return await response.data;
    } catch (error) {
      console.error('Error fetching formations:', error);
      throw error;
    }
  },

  createFormation: async (formationData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/formation/save`, formationData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating formation:', error);
      throw error;
    }
  },
  updateFormation: async (formationData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${BASE_URL}/formation/update`, formationData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating formation:', error);
      throw error;
    }
  },
  deleteFormation: async (formationId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${BASE_URL}/formation/delete/${formationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting formation:', error);
      throw error;
    }
  },
  assignFormateur : async (formationId,formateurId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${BASE_URL}/formation/assignFormateur/${formationId}/${formateurId}`,{}, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error selecting formateur  formation:', error);
      throw error;
    }
  },
  sendFeedbackFormMail : async (formationId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.get(`http://localhost:8080/formation/${formationId}/send-feedback-form`, {
        headers: { Authorization: `Bearer ${token}`,
      },
      });

    } catch (error) {
      console.error('Error sending emails to individuals:', error);
      throw error;
    }
  },
};


export default FormationService;
