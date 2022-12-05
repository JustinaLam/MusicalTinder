import React from "react";
import TinderCard from 'react-tinder-card'
// import { useNavigate } from "react-router-dom";

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
        <div className="w-full">
            <h1 className="font-bold text-3xl">adsf</h1>
            <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>
                <Card />
            </TinderCard>
        </div>
    );
}

export default Homepage;