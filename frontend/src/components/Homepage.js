import React, { useState, useEffect } from "react";
import TinderCard from 'react-tinder-card'
import { NavLink } from "react-router-dom";
import { AiOutlineSearch, AiFillHome } from 'react-icons/ai';

import Card from "./Card";
import { getDefaultPopularSongs, getRecommendedSongs } from "../endpoints";

function Homepage() {
    const [songs, setSongs] = useState([]);
    const [swipedRight, setSwipedRight] = useState([]);

    useEffect(() => {
        async function fetchSongs() {
            const data = await getDefaultPopularSongs();
            setSongs(data.data);
            console.log(data.data)
        }
        fetchSongs();
    }, []);

    const onSwipe = (direction, index) => {
        console.log(direction);
        if (direction === 'right') {
            setSwipedRight([...swipedRight, songs[index]])
        }

        if (swipedRight.length === 3) {
            console.log(swipedRight)
            getRecommendedSongs(swipedRight[0], swipedRight[1], swipedRight[2]).then((response) => {
                setSongs(response.data);
            });
            setSwipedRight([]);
        }
    }

    return (
        <div className="w-full h-screen flex flex-col items-center bg-opacity-10 bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200 p-16">
            <div className="w-5/6 flex flex-row justify-center space-x-10 mb-4">
                <NavLink to="/">
                    <AiFillHome size={30} style={{color: "white", cursor: "pointer"}}/>
                </NavLink>
                <NavLink to="/search">
                    <AiOutlineSearch size={30} style={{color: "white", cursor: "pointer"}}/>
                </NavLink>
            </div>
            <div className="flex h-full align-middle">
                <div className="m-auto">
                    {songs.map((song, index) => 
                    <TinderCard key={song.track_id} onSwipe={(dir) => onSwipe(dir, index)} preventSwipe={['up', 'down']} className="w-[400px] h-[600px] bg-white select-none rounded shadow-xl hover:shadow-2xl ease-in absolute transition-shadow">
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