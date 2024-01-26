import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const EntrepriseService = {
  getAllEntreprises: async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`${BASE_URL}/entreprise/all`, {
        headers: { Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching entreprises:', error);
      throw error;
    }
  },

  createEntreprise: async (entrepriseData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/entreprise/save`, entrepriseData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating entreprise:', error);
      throw error;
    }
  },

  
  updateEntreprise: async (entrepriseData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${BASE_URL}/entreprise/update`, entrepriseData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating entreprise:', error);
      throw error;
    }
  },
  deleteEntreprise: async (entrepriseId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${BASE_URL}/entreprise/delete/${entrepriseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting entreprise:', error);
      throw error;
    }
  },
};


export default EntrepriseService;
