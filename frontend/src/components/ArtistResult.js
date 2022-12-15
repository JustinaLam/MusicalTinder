import React from "react";

// function SongResult({result}) {
function ArtistResult() {
    const result = {
        "name": "Billy Joe",
        "listeners": "420",
        "country": "USA",
        "danceability": "123",
        "energy": "456",
        "loudness": "789",
        "acousticness": "123",
        "instrumentalness": "456",
        "valence": "789",
        "tempo": "pree fast",
        "collaborators": ["John", "Jane", "Joe", "John", "Jane", "Joe", "John", "Jane", "Joe"]
    }
    return (
        <div className="w-3/5 h-4/5 rounded shadow-md hover:shadow-lg flex flex-row space-x-16 p-[30px] m-6 bg-white bg-opacity-80">
            <div className="flex flex-col items-start space-y-2">
            <img src="https://upload.wikimedia.org/wikipedia/en/1/1a/RageAgainsttheMachineRageAgainsttheMachine.jpg" alt="Italian Trulli" 
            className="w-[400px] h-[400px] rounded shadow-md w-full" draggable="false" />
            <h3 className="font-medium text-3xl pt-4 pb-2">{result.name}</h3>
            <h4 className="font-medium text-2xl">Listeners {result.listeners}</h4>
            <h5 className="font-medium text-xl">From {result.country}</h5>
            </div>
            <div className="flex flex-col items-start space-y-2">
                <p className="font-medium text-2xl pb-4">Average Statistics</p>
                <p className="text-xl">Danceability: {result.danceability}</p>
                <p className="text-xl">Energy: {result.energy}</p>
                <p className="text-xl">Loudness: {result.loudness}</p>
                <p className="text-xl">Acousticness: {result.acousticness}</p>
                <p className="text-xl">Instrumentalness: {result.instrumentalness}</p>
                <p className="text-xl">Valence: {result.valence}</p>
                <p className="text-xl">Tempo: {result.tempo}</p>
                <p className="font-medium text-2xl pt-4 pb-4">Top Collaborators</p>
                {result.collaborators.slice(0, 6).map((artist) => (
                    <p className="text-xl">{artist}</p>
                ))}
            </div>
        </div>
    );
}

export default ArtistResult;