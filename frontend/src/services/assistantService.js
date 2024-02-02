import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const UserAssistantService = {
  getAllAssistants: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/assistant/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching assistants:', error);
      throw error;
    }
  },
  getAssistantById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/assistant/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
      return await response.data;
    } catch (error) {
      console.error('Error fetching assistant:', error);
      throw error;
    }
  },

  createAssistant: async (assistantData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/assistant/add`, assistantData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating assistant:', error);
      throw error;
    }
  },

  updateAssistant: async (assistantData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${BASE_URL}/assistant/update`, assistantData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating assistant:', error);
      throw error;
    }
  },
  deleteAssistant: async (assistantId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${BASE_URL}/assistant/delete/${assistantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting assistant:', error);
      throw error;
    }
  },
};

export default UserAssistantService;