import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const CategoryService = {
  getAllCategies: async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("hello");
      const response = await axios.get(`${BASE_URL}/category/all`, {
        headers: { Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      });
      console.log("hi");
      return response.data;
    } catch (error) {
      console.error('Error fetching formateurs:', error);
      throw error;
    }
  }
};

export default CategoryService;
