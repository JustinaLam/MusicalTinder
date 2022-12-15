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
  const { acousticness1, danceability1, energy1, instrumentalness1, tempo1, valence1,
    acousticness2, danceability2, energy2, instrumentalness2, tempo2, valence2,
    acousticness3, danceability3, energy3, instrumentalness3, tempo3, valence3  } = req.query;

  const acousticness = Number(acousticness1) + Number(acousticness2) + Number(acousticness3);
  const acousticness_low = acousticness / 3;
  const acousticness_high = acousticness * 2 / 3;
  const danceability = Number(danceability1) + Number(danceability2) + Number(danceability3);
  const danceability_low = danceability / 3;
  const danceability_high = danceability * 2 / 3;
  const energy = Number(energy1) + Number(energy2) + Number(energy3);
  const energy_low = energy / 3;
  const energy_high = energy * 2 / 3;
  const instrumentalness = Number(instrumentalness1) + Number(instrumentalness2) + Number(instrumentalness3);
  const instrumentalness_low = instrumentalness / 3;
  const instrumentalness_high = instrumentalness * 2 / 3;
  const tempo = Number(tempo1) + Number(tempo2) + Number(tempo3);
  const tempo_low = tempo / 3;
  const tempo_high = tempo * 2 / 3;
  const valence = Number(valence1) + Number(valence2) + Number(valence3);
  const valence_low = valence / 3;
  const valence_high = valence * 2 / 3;

  connection.query(`SELECT *
    FROM Songs USE INDEX(acousticness, danceability, energy, instrumentalness, tempo, valence)
    WHERE danceability BETWEEN ${danceability_low} AND ${danceability_high} AND
      energy BETWEEN ${energy_low} AND ${energy_high} AND
      acousticness BETWEEN ${acousticness_low} AND ${acousticness_high} AND
      instrumentalness BETWEEN ${instrumentalness_low} AND ${instrumentalness_high} AND
      valence BETWEEN ${valence_low} AND ${valence_high} AND
      tempo BETWEEN ${tempo_low} AND ${tempo_high}
      LIMIT 10`, (error, results) => {
    if (error) {
      throw new Error(`error getting recommended songs ${error.message}`);
    } else if (results) {
      res.json({ data: results })
    }
  });
}

// 12 sec without limit to 200ms
async function defaultPopularSongs(req, res) {
  connection.query(`WITH PopularArtists AS (
    SELECT ROW_NUMBER() OVER (ORDER BY listeners DESC) artist_rank, artist_id, artist_name
    FROM Artists
    LIMIT 3),
    PopularArtistsSongs AS (SELECT S.*, P.*,
            ROW_NUMBER() OVER (PARTITION BY P.artist_id ORDER BY S.release_date DESC) AS songNum
    FROM SongBy B JOIN Songs S ON S.track_id = B.track_id
          JOIN PopularArtists P ON B.artist_id = P.artist_id
    WHERE P.artist_rank < 4
    )
  SELECT PAS.* FROM PopularArtistsSongs PAS
  WHERE songNum < 4;`, (error, results) => {
    if (error) {
      throw new Error(`error getting default popular songs ${error.message}`);
    } else if (results) {
      res.json({ data: results })
    }
  });
}

async function recentSongsByArtist(req, res) {
  const { artistid } = req.params;
  connection.query(`SELECT track_id, track_name
  FROM Songs S JOIN SongBy B ON S.track_id = B.track_id
  WHERE B.artist_id = '${artistid}'
  ORDER BY release_date DESC
  LIMIT 20`, (error, results) => {
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
  WHERE track_id = '${id}'`, (error, results) => {
    if (error) {
      throw new Error(`error getting song ${error.message}`);
    } else if (results) {
      res.json({ data: results })
    }
  });
}

async function genres(req, res) {
  connection.query(`SELECT DISTINCT genre FROM Genres`, (error, results) => {
    if (error) {
      throw new Error(`error getting genres ${error.message}`);
      } else if (results) {
      res.json({ data: results })
    }
  });
}

async function artistForTrack(req, res) {
  const { id } = req.params;
  connection.query(`WITH IDs AS 
  (SELECT DISTINCT artist_id
  From SongBy
  WHERE track_id = '${id}')
  SELECT artist_name
  FROM Artists A JOIN IDs I ON A.artist_id = I.artist_id`, (error, results) => {
    if (error) {
      throw new Error(`error getting artists associated with song ${error.message}`);
    } else if (results) {
      res.json({ data: results })
    }
  });
}

async function artistForAlbum(req, res) {
  const { albumid } = req.params;
  connection.query(`SELECT artist_name
  FROM Artists A JOIN AlbumBy B ON A.artist_id = B.artist_id
  WHERE album_id = '${albumid}'`, (error, results) => {
    if (error) {
      throw new Error(`error getting artist associated with album ${error.message}`);
    } else if (results) {
      res.json({ data: results })
    }
  });
}

async function albumForTrack(req, res) {
  const { albumid } = req.params;
  connection.query(`SELECT album_name
  FROM Albums
  WHERE album_id = '${albumid}'`, (error, results) => {
    if (error) {
      throw new Error(`error getting album associated with song ${error.message}`);
    } else if (results) {
      res.json({ data: results })
    }
  });
}

async function collaborators(req, res) {
  const { artistid } = req.params;
  connection.query(`WITH SongsByArtist AS (
        SELECT SB.track_id
        FROM SongBy SB JOIN Artists A on SB.artist_id = A.artist_id
        WHERE A.artist_id = '${artistid}'
    ),
    CollabArtists AS (
        SELECT SB.artist_id, COUNT(SB.track_id) AS numCollabs
        FROM SongBy SB JOIN SongsByArtist SBA ON SB.track_id = SBA.track_id
        GROUP BY SB.artist_id
        ORDER BY numCollabs DESC
    )
    SELECT A.artist_name, CA.numCollabs
    FROM CollabArtists CA JOIN Artists A ON CA.artist_id = A.artist_id
    WHERE A.artist_id <> '${artistid}'
    LIMIT 10`, (error, results) => {
    if (error) {
      throw new Error(`error getting collaborators ${error.message}`);
    } else if (results) {
      res.json({ data: results })
    }
  });
}

// 705ms --> 285ms
async function averageCharacteristics(req, res) {
  const { artistid } = req.params;
  connection.query(`SELECT AVG(danceability) AS danceability,
  AVG(energy) AS energy,
  AVG(acousticness) AS acousticness,
  AVG(instrumentalness) AS instrumentalness,
  AVG(valence) AS valence,
  AVG(tempo) AS tempo
  FROM SongBy B JOIN Songs S ON S.track_id = B.track_id
  WHERE B.artist_id = '${artistid}'`, (error, results) => {
    if (error) {
      throw new Error(`error getting average characteristics ${error.message}`);
    } else if (results) {
      res.json({ data: results })
    }
  });
}

async function explicitArtists(req, res) {
  connection.query(`
    WITH ExplicitCount AS (
    SELECT A.artist_id,
           COUNT(S.track_id) AS numTotal,
           SUM(IF(S.explicit > 0, 1, 0)) AS numExplicit
    FROM Songs S JOIN SongBy ON S.track_id = SongBy.track_id JOIN Artists A ON SongBy.artist_id = A.artist_id
    GROUP BY A.artist_id
    )
    SELECT A.*
    FROM Artists A JOIN ExplicitCount E ON A.artist_id = E.artist_id
    WHERE E.numExplicit * 2 > E.numTotal
  `, (error, results) => {
    if (error) {
      throw new Error(`error getting explicit artists ${error.message}`);
    } else if (results) {
      res.json({ data: results })
    }
  });
}

async function searchSong(req, res) {
  const { query } = req.params;
  const { acousticness_low, acousticness_high,
    danceability_low, danceability_high,
    energy_low, energy_high,
    instrumentalness_low, instrumentalness_high,
    loudness_low, loudness_high,
    valence_low, valence_high,
    genre, year, popularity, country } = req.query;
  connection.query(`SELECT DISTINCT S.track_id AS track_id, S.track_name AS track_name, A.artist_name AS artist_name, L.album_name AS album_name, explicit, release_date, danceability, energy, acousticness, instrumentalness, loudness, valence, tempo
  FROM Songs S USE INDEX(acousticness, danceability, energy, instrumentalness, loudness, valence) JOIN SongBy B ON S.track_id = B.track_id JOIN Genres G ON B.artist_id = G.artist_id JOIN Artists A ON G.artist_id = A.artist_id JOIN Albums L ON S.album_id = L.album_id
  WHERE track_name LIKE '%${query}%' 
  ${Number(danceability_low) !== 25 || Number(danceability_high) !== 75 ? `AND danceability BETWEEN ${Number(danceability_low)} / 100 AND ${Number(danceability_high)} / 100` : ``}
  ${Number(energy_low) !== 25 || Number(energy_high) !== 75 ? `AND energy BETWEEN ${Number(energy_low)} / 100 AND ${Number(energy_high)} / 100 ` : ``}
  ${Number(acousticness_low) !== 25 || Number(acousticness_high) !== 75 ? `AND acousticness BETWEEN ${Number(acousticness_low)} / 100 AND ${Number(acousticness_high)} / 100` : ``}
  ${Number(loudness_low) !== 25 || Number(loudness_high) !== 75 ? `AND loudness BETWEEN ${Number(loudness_low)} AND ${Number(loudness_high)}` : ``}
  ${Number(instrumentalness_low) !== 25 || Number(instrumentalness_high) !== 75 ? `AND instrumentalness BETWEEN ${Number(instrumentalness_low)} / 100 AND ${instrumentalness_high} / 100` : ``}
  ${Number(valence_low) !== 25 || Number(valence_high) !== 75 ? `AND valence BETWEEN ${Number(valence_low)} / 100 AND ${Number(valence_high)} / 100` : ``}
  ${Number(year) !== 1960 ? `AND release_date LIKE '%${Number(year)}%'` : ``}
  ${Number(popularity) !== 50 ? `AND listeners BETWEEN ${Number(popularity)} / 100 * 2000000 AND ${Number(popularity)} / 100 * 5000000` : ``}
  ${genre !== '' ? `AND genre = '${genre}'` : ``}
  ${country !== '' ? `AND country = '${country}'` : ``}
  LIMIT 10
  `, (error, results) => {
    if (error) {
      throw new Error(`error getting song search results ${error.message}`);
    } else if (results) {
      res.json({ data: results })
    }
  });
}

async function searchArtist(req, res) {
  const { query } = req.params;
  const { genre, popularity, country } = req.query;
  connection.query(`SELECT DISTINCT A.artist_id AS artist_id, A.artist_name AS artist_name, A.listeners AS listeners, A.country AS country
  FROM Artists A JOIN Genres G ON A.artist_id = G.artist_id
  WHERE artist_name LIKE '%${query}%'
  ${Number(popularity) !== 50 ? `AND listeners BETWEEN ${Number(popularity)} / 100 * 2000000 AND ${Number(popularity)} / 100 * 5000000` : ``}
  ${genre !== '' ? `AND genre = '${genre}'` : ``}
  ${country !== '' ? `AND country = '${country}'` : ``}
  LIMIT 10
  `, (error, results) => {
    if (error) {
      throw new Error(`error getting artist search results ${error.message}`);
    } else if (results) {
      res.json({ data: results })
    }
  });
}

async function searchAlbum(req, res) {
  const { query } = req.params;
  const { genre, popularity, country } = req.query;
  connection.query(`SELECT *
  FROM Albums A JOIN AlbumBy B ON A.album_id = B.album_id JOIN Genres G ON B.artist_id = G.artist_id
  WHERE album_name LIKE '%${query}%'
  ${genre !== '' ? `AND G.genre = '${genre}'` : ``}
  LIMIT 10
  `, (error, results) => {
    if (error) {
      throw new Error(`error getting album search results ${error.message}`);
    } else if (results) {
      res.json({ data: results })
    }
  });
}

async function songsInAlbum(req, res) {
  const { albumid } = req.params;
  connection.query(`SELECT track_name
  FROM Songs S JOIN Albums A ON S.album_id = A.album_id
  WHERE S.album_id = '${albumid}'
  `, (error, results) => {
    if (error) {
      throw new Error(`error getting songs in album ${error.message}`);
    } else if (results) {
      res.json({ data: results })
    }
  });
}

async function similarAlbums(req, res) {
  const { albumid } = req.params;
  connection.query(`SELECT album_name
  FROM Albums A JOIN AlbumBy B ON A.album_id = B.album_id
  WHERE B.artist_id IN (SELECT artist_id FROM AlbumBy WHERE album_id = '${albumid}')
  `, (error, results) => {
    if (error) {
      throw new Error(`error getting similar albums ${error.message}`);
    } else if (results) {
      console.log("SIMILAR ALBUMS")
      console.log(results)
      res.json({ data: results })
    }
  });
}

module.exports = {
  recommendedSongs,
  defaultPopularSongs,
  recentSongsByArtist,
  song,
  genres,
  artistForTrack,
  artistForAlbum,
  albumForTrack,
  collaborators,
  averageCharacteristics,
  explicitArtists,
  searchSong,
  searchArtist,
  searchAlbum,
  songsInAlbum,
  similarAlbums
}