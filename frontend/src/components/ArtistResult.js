import React, { useState, useEffect } from "react";
import { getArtistInfo, getCollaborators, getAverageCharacteristics } from "../endpoints";

function ArtistResult({result}) {

    const [image, setImage] = useState('');
    const [collaborators, setCollaborators] = useState([]);
    const [averageCharacteristics, setAverageCharacteristics] = useState({});
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const res = await getArtistInfo(result.artist_id);
            setImage(res.images[0].url);

            const collaboratorsRes = await getCollaborators(result.artist_id);
            setCollaborators(collaboratorsRes.data);

            const avgCharacteristicsRes = await getAverageCharacteristics(result.artist_id);
            setAverageCharacteristics(avgCharacteristicsRes.data);

            isLoading(false);
        }

        fetchData();
    }, [result.artist_id]);

    return (
        <div className="w-3/5 h-7/8 rounded shadow-md hover:shadow-lg flex flex-row space-x-16 p-[30px] m-6 bg-white bg-opacity-80">
            <div className="flex flex-col items-start space-y-2">
            <img src={image} alt="artist pic" 
            className="min-w-[320px] min-h-[320px] max-w-[320px] max-h-[320px] rounded shadow-md w-full" draggable="false" />
            <h3 className="font-medium text-3xl pt- truncate">{result.name}</h3>
            <h4 className="font-medium text-2xl truncate">Listeners: {result.listeners}</h4>
            <h5 className="font-medium text-xl truncate">From {result.country}</h5>
            </div>
            {!loading && <div className="flex flex-col items-start space-y-2">
                <p className="font-medium text-2xl pb-4">Average Statistics</p>
                <p className="text-xl">Danceability: {averageCharacteristics[0].danceability}</p>
                <p className="text-xl">Energy: {averageCharacteristics[0].energy}</p>
                <p className="text-xl">Acousticness: {averageCharacteristics[0].acousticness}</p>
                <p className="text-xl">Instrumentalness: {averageCharacteristics[0].instrumentalness}</p>
                <p className="text-xl">Valence: {averageCharacteristics[0].valence}</p>
                <p className="text-xl">Tempo: {averageCharacteristics[0].tempo}</p>
                <p className="font-medium text-2xl pt-4 pb-4">Top Collaborators</p>
                {collaborators.slice(0, 6).map((item) => (
                    <p className="text-xl">{item.artist_name}</p>
                ))}
            </div>}
        </div>
    );
}

export default ArtistResult;