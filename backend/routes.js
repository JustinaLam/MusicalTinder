const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: 'admin',
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
connection.connect();

async function recommendedSongs(req, res) {
  const { song1, song2, song3 } = req.query;

  const acousticness = song1.acousticness + song2.acousticness + song3.acousticness;
  const acousticness_low = acousticness * 2 / 5;
  const acousticness_high = acousticness * 3 / 5;
  const danceability = song1.danceability + song2.danceability + song3.danceability;
  const danceability_low = danceability * 2 / 5;
  const danceability_high = danceability * 3 / 5;
  const energy_low = (song1.energy + song2.energy + song3.energy) * 2 / 5;
  const energy_high = (song1.energy + song2.energy + song3.energy) * 3 / 5;
  const instrumentalness_low = (song1.instrumentalness + song2.instrumentalness + song3.instrumentalness) * 2 / 5;
  const instrumentalness_high = (song1.instrumentalness + song2.instrumentalness + song3.instrumentalness) * 3 / 5;
  const tempo_low = (song1.tempo + song2.tempo + song3.tempo) * 2 / 5;
  const tempo_high = (song1.tempo + song2.tempo + song3.tempo) * 3 / 5;
  const valence_low = (song1.valence + song2.valence + song3.valence) * 2 / 5;
  const valence_high = (song1.valence + song2.valence + song3.valence) * 3 / 5;
  const key = (song1.key + song2.key + song3.key) / 2;

  connection.query(`SELECT track_id AS id, track_name AS name
    FROM Songs
    WHERE danceability BETWEEN ${danceability_low} AND ${danceability_high} AND
      energy BETWEEN ${energy_low} AND ${energy_high} AND
      music_key = ${key} AND
      acousticness BETWEEN ${acousticness_low} AND ${acousticness_high} AND
      instrumentalness BETWEEN ${instrumentalness_low} AND ${instrumentalness_high} AND
      valence BETWEEN ${valence_low} AND ${valence_high} AND
      tempo BETWEEN ${tempo_low} AND ${tempo_high}
      LIMIT 5;`, (error, results) => {
    if (error) {
      throw new Error(`error getting recommended songs ${error.message}`);
    } else if (results) {
      res.json({ data: results })
    }
  });
}

async function defaultPopularSongs(req, res) {
  connection.query(`WITH PopularArtists AS (
    SELECT ROW_NUMBER() OVER (ORDER BY listeners DESC) row_num, artist_id, artist_name
    FROM Artists
    ORDER BY listeners DESC
    LIMIT 3)
    (SELECT S.track_name AS track_name, artist_name
    FROM Songs S JOIN SongBy B ON S.track_id = B.track_id 
          JOIN PopularArtists P ON B.artist_id = P.artist_id
    WHERE P.row_num = 1
    ORDER BY S.release_date DESC
    LIMIT 4)
    UNION 
    (SELECT S.track_name AS track_name, artist_name
    FROM Songs S JOIN SongBy B ON S.track_id = B.track_id 
          JOIN PopularArtists P ON B.artist_id = P.artist_id
    WHERE P.row_num = 2
    ORDER BY S.release_date DESC
    LIMIT 3)
    UNION
    (SELECT S.track_name AS track_name, artist_name
    FROM Songs S JOIN SongBy B ON S.track_id = B.track_id 
          JOIN PopularArtists P ON B.artist_id = P.artist_id
    WHERE P.row_num = 3
    ORDER BY S.release_date DESC
    LIMIT 3)`, (error, results) => {
    if (error) {
      throw new Error(`error getting default recent popular songs ${error.message}`);
    } else if (results) {
      res.json({ data: results })
    }
  });
}

async function recentSongs(req, res) {
  connection.query(`SELECT track_id, track_name
  FROM Songs
  ORDER BY release_date DESC
  LIMIT 50;`, (error, results) => {
    if (error) {
      throw new Error(`error getting most recent songs ${error.message}`);
    } else if (results) {
      res.json({ data: results })
    }
  });
}

async function song(req, res) {
  const { id } = req.params;
  connection.query(`SELECT *
  FROM Songs
  WHERE track_id = ${id};`, (error, results) => {
    if (error) {
      throw new Error(`error getting song ${error.message}`);
    } else if (results) {
      res.json({ data: results })
    }
  });
}

module.exports = {
  recommendedSongs,
  defaultPopularSongs,
  recentSongs,
  song
}