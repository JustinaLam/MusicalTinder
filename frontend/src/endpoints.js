import axios from 'axios';

export const rootURL = 'http://localhost:8000';

export const getRecommendedSongs = async (song1, song2, song3) => {
  try {
    const response = await axios.get(`${rootURL}/recommendedSongs`, 
    { 
      params: { 
        acousticness1: song1.acousticness, 
        danceability1: song1.danceability,
        energy1: song1.energy,
        instrumentalness1: song1.instrumentalness,
        tempo1: song1.tempo,
        valence1: song1.valence,
        acousticness2: song2.acousticness,
        danceability2: song2.danceability,
        energy2: song2.energy,
        instrumentalness2: song2.instrumentalness,
        tempo2: song2.tempo,
        valence2: song2.valence,
        acousticness3: song3.acousticness,
        danceability3: song3.danceability,
        energy3: song3.energy,
        instrumentalness3: song3.instrumentalness,
        tempo3: song3.tempo,
        valence3: song3.valence,
      } 
    });
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
    const response = await axios.get(`${rootURL}/song/${id}`);
    return response.data;
  } catch (err) {
    throw new Error('error getting song');
  }
}

export const getArtistForTrack = async (id) => {
  try {
    const response = await axios.get(`${rootURL}/artist/${id}`);
    return response.data;
  } catch (err) {
    throw new Error('error getting artist for track');
  }
}

export const getAlbumForTrack = async (id) => {
  try {
    const response = await axios.get(`${rootURL}/album/${id}`);
    return response.data;
  } catch (err) {
    throw new Error('error getting album for track');
  }
}

export const getTrackInfo = async (id) => {
  const token = window.localStorage.getItem("token");
  const {data} = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  });
  return data;
}