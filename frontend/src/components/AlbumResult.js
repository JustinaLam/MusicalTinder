import React from "react";

// function SongResult({result}) {
function AlbumResult() {
    const result = {
        "name": "Album Name",
        "artist": "Cool Artist",
        "songs": ["song1", "song2", "song3", "song4", "song5", "song6", "song7"],
        "similar_albums": ["album1", "album2", "album3", "album4", "album5", "album6", "album7"]
    }
    return (
        <div className="w-3/5 h-3/4 rounded shadow-md hover:shadow-lg flex flex-row space-x-16 p-[30px] m-6 bg-white bg-opacity-80">
            <div className="flex flex-col items-start space-y-2">
            <img src="https://upload.wikimedia.org/wikipedia/en/1/1a/RageAgainsttheMachineRageAgainsttheMachine.jpg" alt="Italian Trulli" 
            className="w-[320px] h-[320px] rounded shadow-md w-full" draggable="false" />
            <h3 className="font-medium text-3xl pt-4 pb-2">{result.name}</h3>
            <h5 className="font-medium text-xl">by {result.artist}</h5>
            </div>
            <div className="flex flex-col items-start space-y-2">
                <p className="font-medium text-2xl pb-4">Songs</p>
                {result.songs.slice(0, 6).map((song) => (
                    <p className="text-xl">{song}</p>
                ))}
                <p className="font-medium text-2xl pt-4 pb-4">Similar Albums</p>
                {result.similar_albums.slice(0, 6).map((song) => (
                    <p className="text-xl">{song}</p>
                ))}
            </div>
        </div>
    );
}

export default AlbumResult;