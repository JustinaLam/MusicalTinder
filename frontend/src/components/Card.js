import React, {useState} from 'react'

const Card = ({song}) => {
    return (
      <div className='w-full h-full p-4 flex flex-col'>
        <div className="flex flex-col items-center">
          <img src="https://upload.wikimedia.org/wikipedia/en/1/1a/RageAgainsttheMachineRageAgainsttheMachine.jpg" alt="Italian Trulli" 
            className="rounded shadow-md w-full" draggable="false" ondragstart="return false;" />
        </div>
        <div className="flex flex-col pt-6 p-4">
          <h1 className="text-3xl mb-2">Testify</h1>
          <h2 className="text-xl mb-2">The Battle of Los Angeles</h2>
          <h3 className="text-lg mb-6">Rage Against the Machine</h3>
          {/* <a href={`https://open.spotify.com/track/${song.id}`} className="text-blue-600">Play on Spotify</a> */}
          <a href={`https://open.spotify.com/track/`} className="text-blue-600">Play on Spotify</a>
        </div>
      </div>
    )
}


export default Card;