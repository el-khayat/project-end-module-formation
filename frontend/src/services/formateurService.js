
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const UserFormateurService = {
  getAllFormateurs: async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.get(`${BASE_URL}/user/formateurs`, {
        headers: { Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching formateurs:', error);
      throw error;
    }
  },

  createFormateur: async (formateurData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/user/addUser`, formateurData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating formateur:', error);
      throw error;
    }
  },

  
  updateFormateur: async (formateurData) => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.put(`${BASE_URL}/user/update`, formateurData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating formateur:', error);
      throw error;
    }
  },
  deleteFormateur: async (formateurId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${BASE_URL}/user/delete/${formateurId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting formateur:', error);
      throw error;
    }
  },
};


export default UserFormateurService;
