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

export const getRecentSongs = async (id) => {
  try {
    const response = await axios.get(`${rootURL}/recentSongs/${id}`);
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


export const getGenres = async () => {
  try {
    const response = await axios.get(`${rootURL}/genres`);
    return response.data;
  } catch (err) {
    throw new Error('error getting genres');
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

export const getArtistForAlbum = async (id) => {
  try {
    const response = await axios.get(`${rootURL}/artistForAlbum/${id}`);
    return response.data;
  } catch (err) {
    throw new Error('error getting artist for album');
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

export const getCollaborators = async (id) => {
  try {
    const response = await axios.get(`${rootURL}/collaborators/${id}`);
    return response.data;
  } catch (err) {
    throw new Error('error getting collaborators');
  }
}

export const getAverageCharacteristics = async (id) => {
  try {
    const response = await axios.get(`${rootURL}/averageCharacteristics/${id}`);
    return response.data;
  } catch (err) {
    throw new Error('error getting average characteristics for artist');
  }
}

export const getExplicitArtists = async () => {
  try {
    const response = await axios.get(`${rootURL}/explicitArtists`);
    return response.data;
  } catch (err) {
    throw new Error('error getting explicit artists');
  }
}

export const searchSong = async (query, 
  acousticness_low, acousticness_high,
  danceability_low, danceability_high,
  energy_low, energy_high,
  instrumentalness_low, instrumentalness_high,
  loudness_low, loudness_high,
  valence_low, valence_high, 
  genre, year, popularity, country) => {
  try {
    const response = await axios.get(`${rootURL}/searchsong/${query}`, 
    { 
      params: { 
        acousticness_low, acousticness_high,
        danceability_low, danceability_high,
        energy_low, energy_high,
        instrumentalness_low, instrumentalness_high,
        loudness_low, loudness_high,
        valence_low, valence_high,
        genre, year, popularity, country
      } 
    });
    return response.data;
  } catch (err) {
    throw new Error('error searching song');
  }
}

export const searchArtist = async (query, 
  genre, popularity, country) => {
  try {
    const response = await axios.get(`${rootURL}/searchartist/${query}`, 
    { 
      params: {
        genre, popularity, country
      } 
    });
    return response.data;
  } catch (err) {
    throw new Error('error searching artist');
  }
}

export const searchAlbum = async (query, 
  genre, popularity, country, explicit) => {
  try {
    const response = await axios.get(`${rootURL}/searchalbum/${query}`, 
    { 
      params: {
        genre, popularity, country, explicit
      } 
    });
    return response.data;
  } catch (err) {
    throw new Error('error searching album');
  }
}

export const getSongsInAlbum = async (id) => {
  try {
    const response = await axios.get(`${rootURL}/albumSongs/${id}`);
    return response.data;
  } catch (err) {
    throw new Error('error getting songs in album');
  }
}

export const getSimilarAlbums = async (id) => {
  try {
    const response = await axios.get(`${rootURL}/similarAlbums/${id}`);
    return response.data;
  } catch (err) {
    throw new Error('error getting similar albums');
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

export const getArtistInfo = async (id) => {
  const token = window.localStorage.getItem("token");
  const {data} = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  });
  return data;
}

export const getAlbumInfo = async (id) => {
  const token = window.localStorage.getItem("token");
  const {data} = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  });
  return data;
}