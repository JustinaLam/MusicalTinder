import axios from 'axios';

export const rootURL = 'http://localhost:8000';

export const getAllSongs = async () => {
  try {
    const response = await axios.get(`${rootURL}/recentsongs`);
    return response.data;
  } catch (err) {
    throw new Error('error testing');
  }
};