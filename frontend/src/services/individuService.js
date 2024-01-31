import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const IndividualService = {
  addIndividual: async (individualData) => {
    try {
      const response = await axios.post(`${BASE_URL}/individual/add`, individualData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding individual:', error);
      throw error;
    }
  },
  
  getIndividualById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/individual/${id}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching individual by ID:', error);
      throw error;
    }
  },
  
  getIndividualByNameAndEmail: async (name, email) => {
    try {
      const response = await axios.get(`${BASE_URL}/individual/${name}/${email}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching individual by name and email:', error);
      throw error;
    }
  },
  
  getAllIndividuals: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/individual/all`, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching all individuals:', error);
      throw error;
    }
  },
  
  updateIndividual: async (individualData) => {
    try {
      const response = await axios.put(`${BASE_URL}/individual/update`, individualData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating individual:', error);
      throw error;
    }
  },
  
  deleteIndividual: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/individual/delete/${id}`, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting individual:', error);
      throw error;
    }
  },

  getIndividualFormations: async (individualId) => {
    try {
      const response = await axios.get(`${BASE_URL}/individual/${individualId}/formation`, {
        headers: { 'Content-Type': 'application/json' },
      });
      const formations = response.data;
      const formationIds = formations.map(formation => formation.id);
      return formationIds;
    } catch (error) {
      console.error('Error fetching individual formations:', error);
      throw error;
    }
  },
};

export default IndividualService;
