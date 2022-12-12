import React, { useState, useEffect } from "react";
import TinderCard from 'react-tinder-card'
// import { useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiFillHome } from 'react-icons/ai';

import Card from "./Card";
import { getDefaultPopularSongs } from "../endpoints";

function Homepage() {
    // const navigate = useNavigate();

    const [songs, setSongs] = useState([]);

    useEffect(() => {
        async function fetchSongs() {
        const data = ["song1", "song2"];
        // await getDefaultPopularSongs();
        setSongs(data);
        }
        fetchSongs();
    }, []);

    const onSwipe = (direction) => {
      console.log('You swiped: ' + direction)
    }
      
    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
    }

    return (
        <div className="w-full h-screen flex flex-col items-center bg-opacity-10 bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200 p-16">
            <div className="w-5/6 flex flex-row justify-center space-x-10 mb-4">
                <AiFillHome size={30} style={{color: "white"}} />
                <AiOutlineSearch size={30} style={{color: "white"}} />
            </div>
            <div className="flex h-full align-middle">
                <div className="m-auto">
                    {songs.map((song) => 
                    <TinderCard key={song.track_id} onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['up', 'down']} className="w-[400px] h-[600px] bg-white select-none rounded shadow-xl hover:shadow-2xl ease-in absolute transition-shadow">
                        <Card song={song} />
                    </TinderCard>
                    )}
                    <div className="w-[400px] h-[600px]"></div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;