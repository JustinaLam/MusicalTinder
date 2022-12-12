import React from "react";
import TinderCard from 'react-tinder-card'
// import { useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiFillHome } from 'react-icons/ai';

import Card from "./Card";

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
            <div className="w-5/6 flex flex-row justify-center space-x-10">
                <AiFillHome size={30} style={{color: "white"}} />
                <AiOutlineSearch size={30} style={{color: "white"}} />
            </div>
            <div className="flex h-full align-middle">
                <div className="m-auto">
                    <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['up', 'down']} className="w-[400px] h-[600px] bg-white select-none rounded shadow-xl hover:shadow-2xl ease-in absolute transition-shadow">
                        <Card />
                    </TinderCard>
                    {/* <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']} className="w-[400px] h-[600px] bg-white select-none rounded shadow-xl hover:shadow-2xl ease-in transition-shadow absolute top-0">
                        <Card />
                    </TinderCard> */}
                    <div className="w-[400px] h-[600px]"></div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;