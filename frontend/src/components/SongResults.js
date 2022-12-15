import React, { useState } from 'react';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import SongResult from "./SongResult";

function SongResults() {

  const results = [
    {
        "name": "Testify",
        "artist": "Rage Against The Machine",
        "album": "The Battle of Los Angeles",
        "album2": "The Battle of Los Angeles",
        "album3": "The Battle of Los Angeles",
        "album4": "The Battle of Los Angeles",
        "album5": "The Battle of Los Angeles",
        "album6": "The Battle of Los Angeles",
        "album7": "The Battle of Los Angeles",
        "album8": "The Battle of Los Angeles",
        "album9": "The Battle of Los Angeles",
    },
    {
        "name": "Tre",
        "artist": "Rage Against The Machine",
        "album": "The Battle of Los Angeles",
        "album2": "The Battle of Los Angeles",
        "album3": "The Battle of Los Angeles",
        "album4": "The Battle of Los Angeles",
        "album5": "The Battle of Los Angeles",
        "album6": "The Battle of Los Angeles",
        "album7": "The Battle of Los Angeles",
        "album8": "The Battle of Los Angeles",
        "album9": "The Battle of Los Angeles",
    }
  ]

  const [idx, setIdx] = useState(0);
  const next = () => setIdx(prev => Math.min(prev + 1, results.length - 1));
  const prev = () => setIdx(prev => Math.max(prev - 1, 0));

  return (
    <div className="w-full flex flex-row justify-center items-center space-x-10">
        <BsFillArrowLeftCircleFill size={30} style={{color: "white", cursor: "pointer"}} onClick={prev} />
        <SongResult result={results[idx]} />
        <BsFillArrowRightCircleFill size={30} style={{color: "white", cursor: "pointer"}} onClick={next} />
    </div>
  )
}

export default SongResults