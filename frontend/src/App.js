import React, { useEffect } from 'react'
import { getAllSongs } from './endpoints';

function App() {

  const [songs, setSongs] = React.useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllSongs();
      setSongs(response.data);
    }
    fetchData();
  }, [songs]);

  return (
    <div>
      <div className="text-center">
        {songs.map((song) => (<h1 key={song.id} >{song.name}</h1>))}
      </div>
    </div>
  )
}

export default App;