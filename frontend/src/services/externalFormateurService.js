import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const ExternalFormateurService = {
  
  createFormateur: async (externalFormateurData) => {
    try {
      const response = await axios.post(`${BASE_URL}/user/formateur/eternal/add`, externalFormateurData);
      return response.data;
    } catch (error) {
      console.error('Error creating external formateur:', error);
      throw error;
    }
  },
  getAllExternalFormateurs: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/user/formateurs/external`, {
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
  updateFormateurRole: async (formateurId,role) => {
    try {
      console.log(role)
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.put( `${BASE_URL}/user/update/role/${formateurId}/${role}`,{}, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating formateur role:', error);
      throw error;
    }
  },
  deleteExternalFormateur: async (formateurId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${BASE_URL}/user/delete/${formateurId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting external formateur:', error);
      throw error;
    }
  },
};

export default ExternalFormateurService;
