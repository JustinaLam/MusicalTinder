const mysql = require('mysql');
// const config = require('./config.js')
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
  const { id, artist, album } = req.query;

  // query for songs in album, by a collaborative artist; instead can query for songs with similar characteristics
  connection.query(`(SELECT S.track_name AS name
  FROM Songs S JOIN Albums A ON S.album_id = A.album_id
  WHERE A.album_name = ${album})
  LIMIT 5
  UNION 
  (WITH ArtistSongs AS (
    SELECT S.track_id
    FROM Songs S JOIN SongBy B ON S.track_id = B.track_id JOIN Artists A ON B.artist_id = A.artist_id
    WHERE A.artist_name = ${artist}
  ), Collaborators AS (
  SELECT DISTINCT A.artist_id
  FROM Artists A JOIN SongBy B ON A.artist_id = B.artist_id
  WHERE B.track_id IN ArtistSongs AND A.artist_name <> ${artist}
  )
  SELECT S.track_name as name
  FROM Songs S JOIN SongBy B ON S.track_id = B.track_id JOIN Collaborators C ON B.artist_id = C.artist_id
  LIMIT 5)
  `, (error, results) => {
    if (error) {
      throw new Error(`error getting recommended songs ${error.message}`);
    } else if (results) {
      res.json({ data: results })
    }
  });
}

async function recentSongs(req, res) {
  connection.query(`SELECT S.track_id AS id, S.track_name AS name
    FROM Songs S
    ORDER BY S.release_date DESC
    LIMIT 10;`, (error, results) => {
    if (error) {
      throw new Error(`error getting recent songs ${error.message}`);
    } else if (results) {
      res.json({ data: results })
    }
  });
}

module.exports = {
  recommendedSongs,
  recentSongs,
}