import React, { useState } from 'react';
import { AiOutlineSearch, AiFillHome } from 'react-icons/ai';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { NavLink, useParams, useLocation } from "react-router-dom";
import SongResult from "./SongResult";
import ArtistResult from "./ArtistResult";
import AlbumResult from "./AlbumResult";

function Results() {

  const {type} = useParams();
  const {state} = useLocation();
  const {results} = state;

  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(prev => Math.max(prev - 1, 0));
  const next = () => setIdx(prev => Math.min(prev + 1, results.length - 1));

  return (
      <div className="w-full h-screen overflow-hidden flex flex-col items-center bg-opacity-10 bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200 p-12">
        <div className="w-5/6 flex flex-row justify-center space-x-10 mb-4">
            <NavLink to="/">
                <AiFillHome size={30} className="text-white hover:text-blue-600 transition-all ease-in fill-current cursor-pointer" />
            </NavLink>
            <NavLink to="/search">
                <AiOutlineSearch size={30} className="text-white hover:text-blue-600 transition-all ease-in fill-current cursor-pointer" />
            </NavLink>
        </div>
        <div className="w-full h-screen flex flex-row justify-center items-center space-x-10 mb-4">
          <BsFillArrowLeftCircleFill size={50} className="text-white hover:text-blue-600 transition-all ease-in fill-current cursor-pointer" onClick={prev} />
          {type === 'song' ? <SongResult result={results[idx]} /> : null}
          {type === 'artist' ? <ArtistResult result={results[idx]} /> : null}
          {type === 'album' ? <AlbumResult result={results[idx]} /> : null}
          <BsFillArrowRightCircleFill size={50} className="text-white hover:text-blue-600 transition-all ease-in fill-current cursor-pointer" onClick={next} />
        </div>
    </div>
  )
}

export default Results