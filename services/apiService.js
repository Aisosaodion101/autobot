const axios = require('axios');

const apiService = {
  fetchData: async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
};

module.exports = apiService;
