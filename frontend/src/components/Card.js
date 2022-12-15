import React, { useState, useEffect } from 'react'
import { getAlbumForTrack, getArtistForTrack, getTrackInfo } from '../endpoints';

const Card = ({song}) => {

  const [album, setAlbum] = useState('');
  const [artist, setArtist] = useState('');
  const [image, setImage] = useState('');
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  }

  useEffect(() => {
    getAlbumForTrack(song.album_id).then((album_response) => setAlbum(album_response.data[0].album_name));
    getArtistForTrack(song.track_id).then((artist_response) => setArtist(artist_response.data.artist_name));
    getTrackInfo(song.track_id).then((response) => {
      setImage(response.album.images[0].url);
      setAudio(new Audio(response.preview_url));
    });
  }, []);

    return (
      <div className='w-full h-full p-4 flex flex-col'>
        <div className="flex flex-col items-center">
          <img src={image} alt="song pic" 
            className="rounded shadow-md w-full" draggable="false" />
        </div>
        <div className="flex flex-col pt-6 p-4">
          <h1 className="text-2xl mb-2">{song.track_name}</h1>
          <h2 className="text-xl mb-2">{album}</h2>
          <h3 className="text-lg mb-2">{artist}</h3>
          <button className="mb-4" onClick={toggle}>{playing ? "Pause" : "Play"}</button>
          <a href={`https://open.spotify.com/track/${song.track_id}`} className="text-blue-600">Play full song on Spotify</a>
        </div>
      </div>
    )
}


export default Card;