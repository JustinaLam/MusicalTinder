# MusicalTinder

**Project Description:** We built Tinder for songs. The main page features a card-swiping element that allows users to swipe right/left on songs, which fine-tunes our query to fit the user’s preferences. We will also implement a search feature that allows users to request a list of songs or information about a song, given, for example, the artist or album, from entering specific parameters (eg. artist, music region, genre, popularity, etc.)

`backend/` holds all backend logic using Node, Express, and MySQL.

`frontend/` holds all frontend logic in React, Tailwind, and JS.


## Build Instructions

First, make sure dependencies are installed with `npm install`. Then, to run our backend server, call `npm start` on the `backend` folder. For the frontend, call `npm start` in the `frontend` folder, which should also automatically open `localhost:3000` in the browswer.

### Spotify Setup

Since we connect to the Spotify API, there are a few more steps to get the API calls working.
1. Navigate to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/login) and sign in.
2. Create a new app with any name and description.
3. Go to "Edit Settings" on the top right and add "http://localhost:3000/" to "Redirect URIs."
4. Go to "Users and Access." Copy the Client ID and set it in `frontend/.env` like below.
```
REACT_APP_CLIENT_ID=xxx
```
5. In the frontend, login to Spotify using the top banner. Images and music should now be successfully fetched!

## Dependencies

Our dependencies are listed in `package.json`. The main ones are listed below:
```
      "antd": "^5.0.5",
      "axios": "^1.2.0",
      "react-icons": "^4.7.1",
      "react-tinder-card": "^1.6.2",
```
