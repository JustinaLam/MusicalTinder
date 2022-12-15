const express = require('express');
const cors = require('cors');
const routes = require('./routes')

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 8000;

app.listen(port, async () => {
  console.log(`server is running on port ${port}`);
});

// get next recommended songs
app.get("/recommendedSongs", routes.recommendedSongs);

// get default songs
app.get("/defaultPopularSongs", routes.defaultPopularSongs);

// get most recent songs by artist
app.get("/recentSongs/:artistid", routes.recentSongsByArtist);

// get song info
app.get("/song/:id", routes.song);

// get all genres
app.get("/genres", routes.genres);

// get artist name(s) given track id
app.get("/artist/:trackid", routes.artistForTrack);

// get album name given album id
app.get("/album/:albumid", routes.albumForTrack);

// get collaborators
app.get("/collaborators/:artistid", routes.collaborators);

// get artist's average song characteristics
app.get("/averageCharacteristics/:artistid", routes.averageCharacteristics);

// get explicit artists for search
app.get("/explicitArtists", routes.explicitArtists);

// search for song
app.get("/searchsong/:query", routes.searchSong);

// search for artist
app.get("/searchartist/:query", routes.searchArtist);

// search for album
app.get("/searchalbum/:query", routes.searchAlbum);
