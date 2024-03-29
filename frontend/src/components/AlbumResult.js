import React, { useState, useEffect } from 'react'
import { getAlbumInfo, getArtistForAlbum, getSongsInAlbum, getSimilarAlbums } from '../endpoints';

function AlbumResult({result}) {
    const [image, setImage] = useState('');
    const [artist, setArtist] = useState([]);
    const [songs, setSongs] = useState([]);
    const [similarAlbums, setSimilarAlbums] = useState([]);
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const res = await getAlbumInfo(result.album_id);
            setImage(res.images[0].url);

            const artistRes = await getArtistForAlbum(result.album_id);
            setArtist(artistRes.data);

            const songsRes = await getSongsInAlbum(result.album_id);
            setSongs(songsRes.data);

            const similarAlbumsRes = await getSimilarAlbums(result.album_id);
            setSimilarAlbums(similarAlbumsRes.data);

            isLoading(false);
        }

        fetchData();
    }, [result.album_id]);


    return (
        <div className="w-3/5 h-7/8 rounded shadow-md hover:shadow-lg flex flex-row p-[30px] m-6 bg-white bg-opacity-80">
            <div className="flex flex-col w-1/2 items-start space-y-2">
            <img src={image} alt="song pic" 
                className="min-w-[320px] min-h-[320px] max-w-[320px] max-h-[320px] rounded shadow-md w-full" draggable="false" />
            <h3 className="w-full font-medium text-3xl pt-4 truncate">{result.name}</h3>
            {!loading && <h5 className="w-full font-medium text-xl truncate">by {artist[0].artist_name}</h5>}
            </div>
            {!loading && <div className="flex flex-col w-1/2 pl-16 items-start space-y-2">
                <p className="font-medium text-2xl pb-1">Songs</p>
                {songs.slice(0, 6).map((song) => (
                    <p className="text-xl">{song.track_name}</p>
                ))}
                <p className="font-medium text-2xl pt-4 pb-1">Similar Albums</p>
                {similarAlbums.slice(0, 6).map((song) => (
                    <p className="text-xl">{song.album_name}</p>
                ))}
            </div>}
        </div>
    );
}

export default AlbumResult;