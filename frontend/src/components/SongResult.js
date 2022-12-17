import React, { useState, useEffect } from 'react'
import { getTrackInfo } from '../endpoints';

function SongResult({result}) {

    const [image, setImage] = useState('');

    useEffect(() => {
        getTrackInfo(result.track_id).then((response) => {
            setImage(response.album.images[0].url);
        });
    }, [result.track_id]);

    return (
        <div className="w-3/5 h-7/8 rounded shadow-md hover:shadow-lg flex flex-row space-x-16 p-[30px] m-6 bg-white bg-opacity-80">
            <div className="flex flex-col items-start space-y-2">
                <img src={image} alt="song pic" 
                    className="min-w-[320px] min-h-[320px] max-w-[320px] max-h-[320px] rounded shadow-md w-full" draggable="false" />
                <h3 className="font-medium text-3xl pt-4 truncate">{result.name}</h3>
                <h4 className="font-medium text-2xl truncate">{result.album}</h4>
                <h5 className="font-medium text-xl truncate">by {result.artist}</h5>
                <h5 className="text-xl truncate">released in {result.release_date}</h5>
            </div>
            <div className="flex flex-col items-start space-y-2">
                <p className="font-medium text-2xl pb-4">Statistics</p>
                <p className="text-xl">Explicit: {result.explicit === 0 ? 'no' : 'yes'}</p>
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