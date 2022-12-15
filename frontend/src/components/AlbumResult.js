import React, { useState, useEffect } from 'react'
import { getAlbumInfo, getArtistForAlbum, getSongsInAlbum, getSimilarAlbums } from '../endpoints';

function AlbumResult({result}) {
    // const submitSearch = async () => {
    //     const artist = await getArtistForAlbum(res.data.album_id);
    //     const songs = await getSongsInAlbum(res.data.album_id);
    //     const similarAlbums = await getSimilarAlbums(res.data.album_id);
    // }
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
            console.log(artistRes)
            setArtist(artistRes.data);

            const songsRes = await getSongsInAlbum(result.album_id);
            console.log(songsRes)
            setSongs(songsRes.data);

            const similarAlbumsRes = await getSimilarAlbums(result.album_id);
            console.log(similarAlbumsRes)
            setSimilarAlbums(similarAlbumsRes.data);

            isLoading(false);
        }

        fetchData();
    }, [result.album_id]);

    console.log(similarAlbums)

    return (
        <div className="w-3/5 h-3/4 rounded shadow-md hover:shadow-lg flex flex-row space-x-16 p-[30px] m-6 bg-white bg-opacity-80">
            <div className="flex flex-col items-start space-y-2">
            <img src={image} alt="song pic" 
                className="w-[320px] h-[320px] rounded shadow-md w-full" draggable="false" />
            <h3 className="font-medium text-3xl pt-4 pb-2">{result.name}</h3>
            {!loading && <h5 className="font-medium text-xl">by {artist[0].artist_name}</h5>}
            </div>
            {!loading && <div className="flex flex-col items-start space-y-2">
                <p className="font-medium text-2xl pb-4">Songs</p>
                {songs.slice(0, 6).map((song) => (
                    <p className="text-xl">{song.track_name}</p>
                ))}
                <p className="font-medium text-2xl pt-4 pb-4">Similar Albums</p>
                {similarAlbums.slice(0, 6).map((song) => (
                    <p className="text-xl">{song.album_name}</p>
                ))}
            </div>}
        </div>
    );
}

export default AlbumResult;