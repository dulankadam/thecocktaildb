import axios from 'axios';

const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export const fetchRandomCocktails = async () => {
    try {
      const responses = await Promise.all([
        axios.get(`${API_BASE_URL}/random.php`),
        axios.get(`${API_BASE_URL}/random.php`),
        axios.get(`${API_BASE_URL}/random.php`),
        axios.get(`${API_BASE_URL}/random.php`),
        axios.get(`${API_BASE_URL}/random.php`)
      ]);
      return responses.map(response => response.data.drinks[0]);
    } catch (error) {
      console.error('Error fetching random cocktails:', error);
      return [];
    }
  };

export const searchCocktails = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search.php?s=${query}`);
    return response.data.drinks;
  } catch (error) {
    console.error('Error searching cocktails:', error);
    return [];
  }
};
