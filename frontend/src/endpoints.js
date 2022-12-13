import axios from 'axios';

export const rootURL = 'http://localhost:8000';

export const getRecommendedSongs = async (song1, song2, song3) => {
  try {
    const response = await axios.get(`${rootURL}/recommendedSongs`, { params: { song1, song2, song3 } });
    return response.data; 
  } catch (err) {
    throw new Error('error getting recommended songs');
  }
};

export const getDefaultPopularSongs = async () => {
  try {
    const response = await axios.get(`${rootURL}/defaultPopularSongs`);
    return response.data;
  } catch (err) {
    throw new Error('error getting recent songs');
  }
};

export const getRecentSongs = async () => {
  try {
    const response = await axios.get(`${rootURL}/recentSongs`);
    return response.data;
  } catch (err) {
    throw new Error('error getting recent songs');
  }
}

export const getSong = async (id) => {
  try {
    const response = await axios.get(`${rootURL}/song/:id`);
    return response.data;
  } catch (err) {
    throw new Error('error getting song');
  }
}

export const getGenres = async () => {
  try {
    const response = await axios.get(`${rootURL}/genres`);
    return response.data;
  } catch (err) {
    throw new Error('error getting genres');
  }
}