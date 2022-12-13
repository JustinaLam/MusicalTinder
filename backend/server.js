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

// get most recent songs
app.get("/recentSongs", routes.recentSongs);

// get song info
app.get("/song/:id", routes.song);

// get all genres
app.get("/genres", routes.genres);