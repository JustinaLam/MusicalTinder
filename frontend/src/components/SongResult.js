import React, { useState, useEffect } from 'react'
import { getTrackInfo } from '../endpoints';

// function SongResult({result}) {
function SongResult() {
    const result = {
        "track_id": "asdfiaskjdfaslkfhsda",
        "name": "Testify",
        "artist": "Rage Against The Machine",
        "album": "The Battle of Los Angeles",
        "release_date": "08-20-2022",
        "explicit": "True",
        "danceability": "123",
        "energy": "456",
        "loudness": "789",
        "acousticness": "123",
        "instrumentalness": "456",
        "valence": "789",
        "tempo": "pree fast",
    }

    const [image, setImage] = useState('');

    useEffect(() => {
        getTrackInfo(result.track_id).then((response) => {
        setImage(response.album.images[0].url);
        });
    }, []);

    return (
        <div className="w-3/5 h-2/3 rounded shadow-md hover:shadow-lg flex flex-row space-x-16 p-[30px] m-6 bg-white bg-opacity-80">
            <div className="flex flex-col items-start space-y-2">
                <img src={image} alt="song pic" 
                    className="w-[320px] h-[320px] rounded shadow-md w-full" draggable="false" />
                <h3 className="font-medium text-3xl pt-4 pb-2">{result.name}</h3>
                <h4 className="font-medium text-2xl">{result.album}</h4>
                <h5 className="font-medium text-xl">by {result.artist}</h5>
                <h5 className="pt-4 text-xl">released on {result.release_date}</h5>
            </div>
            <div className="flex flex-col items-start space-y-2">
                <p className="font-medium text-2xl pb-4">Statistics</p>
                <p className="text-xl">Explicit: {result.explicit}</p>
                <p className="text-xl">Danceability: {result.danceability}</p>
                <p className="text-xl">Energy: {result.energy}</p>
                <p className="text-xl">Loudness: {result.loudness}</p>
                <p className="text-xl">Acousticness: {result.acousticness}</p>
                <p className="text-xl">Instrumentalness: {result.instrumentalness}</p>
                <p className="text-xl">Valence: {result.valence}</p>
                <p className="text-xl">Tempo: {result.tempo}</p>
            </div>
        </div>
    );
}

export default SongResult;