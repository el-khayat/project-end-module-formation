import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const UserFormateurService = {
  getAllFormateurs: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/formateur/formateurs`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching formateurs:', error);
      throw error;
    }
  },
  getFormateurById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/formateur/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      return await response.data;
    } catch (error) {
      console.error('Error fetching formateurs:', error);
      throw error;
    }
  },

  createFormateur: async (formateurData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/formateur/add`, formateurData, {
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
      console.log("formateurData", formateurData);
      const token = localStorage.getItem('token');
      const response = await axios.put(`${BASE_URL}/formateur/update`, formateurData, {
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
      const response = await axios.delete(`${BASE_URL}/formateur/delete/${formateurId}`, {
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
