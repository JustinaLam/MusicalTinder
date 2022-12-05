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

// get recent songs
app.get("/recentsongs", routes.recentSongs);

//setting up a server, connecting it to database, and creating route that queries your database