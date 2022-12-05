import axios from 'axios';

export const rootURL = 'http://localhost:8000';

export const getRecommendedSongs = async () => {
  try {
    const response = await axios.get(`${rootURL}/recommendedSongs`);
    return response.data; 
  } catch (err) {
    throw new Error('error getting recommended songs');
  }
  
}

export const getRecentSongs = async () => {
  try {
    const response = await axios.get(`${rootURL}/recentSongs`);
    return response.data;
  } catch (err) {
    throw new Error('error getting recent songs');
  }
};