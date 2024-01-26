
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const PlanningService = {
  getAllPlannings: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/planning/all`, {
        headers: { Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      });
      const plannings = await response.data;
      return  plannings.map(planning=>{
        planning.end = new Date(planning.end)
        planning.start = new Date(planning.start)
        return planning
      })
    } catch (error) {
      console.error('Error fetching plannings:', error);
      throw error;
    }
  },

  createPlanning: async (planningData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}/planning/save`, planningData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating planning:', error);
      throw error;
    }
  },

  
  updatePlanning: async (planningData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${BASE_URL}/planning/update`, planningData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating planning:', error);
      throw error;
    }
  },
  deletePlanning: async (planningId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${BASE_URL}/planning/delete/${planningId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting planning:', error);
      throw error;
    }
  },
};


export default PlanningService;
