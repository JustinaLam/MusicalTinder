import React, { useState, useEffect } from 'react'
import { getAlbumForTrack, getArtistForTrack, getTrackInfo } from '../endpoints';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';

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
    async function fetchData() {
      const artist_response = await getArtistForTrack(song.track_id);
      setArtist(artist_response.data.artist_name);

      const album_response = await getAlbumForTrack(song.album_id);
      setAlbum(album_response.data[0].album_name);

      const res = await getTrackInfo(song.track_id);
      setImage(res.album.images[0].url);
      setAudio(new Audio(res.preview_url));
    }
    
    fetchData();
  }, []);

    return (
      <div className='w-full h-full p-4 flex flex-col'>
        <div className="flex flex-col items-center">
          <img src={image} alt="song pic" 
            className="rounded shadow-md w-full" draggable="false" />
        </div>
        <div className="flex flex-col pt-6 p-4">
          <h1 className="text-2xl mb-2 truncate">{song.track_name}</h1>
          <h2 className="text-xl mb-2 truncate">{album}</h2>
          <h3 className="text-lg mb-2 truncate">{artist}</h3>
          <div className="flex flex-row justify-center items-center space-x-4 p-4 bg-stone-100">
            <button className="text-stone-800 hover:text-blue-600 transition-all ease-in fill-current cursor-pointer" onClick={toggle}>{playing ? <AiFillPauseCircle size={50}/> : <AiFillPlayCircle size={50}/>}</button>
            <a href={`https://open.spotify.com/track/${song.track_id}`} className="text-blue-600">Check full song on Spotify</a>
          </div>
        </div>
      </div>
    )
}


export default Card;