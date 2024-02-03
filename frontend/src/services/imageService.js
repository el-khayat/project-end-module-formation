import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const ImageService = {
  getImage: async (imageName) => {
    try {
      const response = await axios.get(`${BASE_URL}/formation/image/${imageName}`, {
        responseType: 'arraybuffer', // Ensure response is treated as binary data
      });
      console.log("data retrieved ");
      return response.data;
    } catch (error) {
      console.error('Error fetching image:', error);
      throw error;
    }
  },
};

export default ImageService;
