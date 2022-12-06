import React from "react";
import TinderCard from 'react-tinder-card'
// import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from 'react-icons/ai';

import Card from "./Card";
import Search from "./Search";

function Homepage() {
    // const navigate = useNavigate();

    const onSwipe = (direction) => {
      console.log('You swiped: ' + direction)
    }
      
    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
    }

    return (
        <div className="w-full h-screen flex flex-col items-center bg-opacity-10 bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200 p-24">
            <div className="relative">
                <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']} className="w-[400px] h-[600px] bg-white select-none rounded shadow-xl hover:shadow-2xl ease-in absolute transition-shadow top-[10px]">
                    <Card />
                </TinderCard>
                <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']} className="w-[400px] h-[600px] bg-white select-none rounded shadow-xl hover:shadow-2xl ease-in transition-shadow absolute top-0">
                    <Card />
                </TinderCard>
                <div className="w-[400px] h-[600px]"></div>
            </div>
            <div className="w-[600px] h-16 flex flex-row items-center justify-center space-x-4 bg-white mt-10 p-4 rounded-full opacity-90 shadow hover:shadow-2xl ease-in transition-shadow">
                <AiOutlineSearch size={30} />
                <p className="text-lg">Looking for a specific song, artist, album, genre, or country?</p>
            </div>
        </div>
    );
}

export default Homepage;