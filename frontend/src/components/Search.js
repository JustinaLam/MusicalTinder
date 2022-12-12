import React, {useState} from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import {Slider, Select} from 'antd';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';

import Result from "./Result";

function Search() {
    const [acousticness, setAcousticness] = useState([]);
    const [danceability, setDanceability] = useState([]);
    const [energy, setEnergy] = useState([]);
    const [instrumentalness, setInstrumentalness] = useState([]);
    const [loudness, setLoudness] = useState([]);
    const [valence, setValence] = useState([]);
    const [year, setYear] = useState();
    const [popularity, setPopularity] = useState();

    const handleAcousticnessChange = (value) => {
        setAcousticness([value[0], value[1]]);
    }

    const handleDanceabilityChange = (value) => {
        setDanceability([value[0], value[1]]);
    }

    const handleEnergyChange = (value) => {
        setEnergy([value[0], value[1]]);
    }

    const handleInstrumentalnessChange = (value) => {
        setInstrumentalness([value[0], value[1]]);
    }

    const handleLoudnessChange = (value) => {
        setLoudness([value[0], value[1]]);
    }

    const handleValenceChange = (value) => {
        setValence([value[0], value[1]]);
    }

    const handleYearChange = (value) => {
        setYear(value);
    }

    const handlePopularityChange = (value) => {
        setPopularity(value);
    }

    const results = [
        {
            "name": "Testify",
            "artist": "Rage Against The Machine",
            "album": "The Battle of Los Angeles",
            "album2": "The Battle of Los Angeles",
            "album3": "The Battle of Los Angeles",
            "album4": "The Battle of Los Angeles",
            "album5": "The Battle of Los Angeles",
            "album5": "The Battle of Los Angeles",
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
            "album5": "The Battle of Los Angeles",
            "album7": "The Battle of Los Angeles",
            "album8": "The Battle of Los Angeles",
            "album9": "The Battle of Los Angeles",
        }
    ]

    const [idx, setIdx] = React.useState(0);
    const next = () => setIdx(prev => Math.min(prev + 1, results.length - 1));
    const prev = () => setIdx(prev => Math.max(prev - 1, 0));

    return (
        <div className="w-full h-screen overflow-hidden flex flex-col items-center bg-opacity-10 bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200 p-12">
            <div className="w-[600px] h-16 flex flex-row items-center justify-center space-x-4 bg-white mt-10 p-4 rounded-full opacity-90 shadow hover:shadow-2xl ease-in transition-shadow">
                <AiOutlineSearch size={30} />
                <input type="text" placeholder="Search for a song, artist, or album!" className="w-[500px] outline-none" />
            </div>
            <div className="w-1/2 bg-white mt-4 mb-6 pl-8 pr-8 pt-4 pb-4 rounded opacity-90 flex flex-row space-x-4">
                <div className="w-1/2 text-left">
                    <div className="flex flex-row">
                        <div className="w-1/3 mt-1">Acousticness</div>
                        <div className="w-2/3"><Slider range defaultValue={[25, 75]} onChange={handleAcousticnessChange} /></div>
                    </div>
                    <div className="flex flex-row">
                        <div className="w-1/3 mt-1">Danceability</div>
                        <div className="w-2/3"><Slider range defaultValue={[25, 75]} onChange={handleDanceabilityChange} /></div>
                    </div>
                    <div className="flex flex-row">
                        <div className="w-1/3 mt-1">Energy</div>
                        <div className="w-2/3"><Slider range defaultValue={[25, 75]} onChange={handleEnergyChange} /></div>
                    </div>
                    <div className="flex flex-row">
                        <div className="w-1/3 mt-1">Instrumentalness</div>
                        <div className="w-2/3"><Slider range defaultValue={[25, 75]} onChange={handleInstrumentalnessChange} /></div>
                    </div>
                    <div className="flex flex-row">
                        <div className="w-1/3 mt-1">Loudness</div>
                        <div className="w-2/3"><Slider range defaultValue={[25, 75]} onChange={handleLoudnessChange} /></div>
                    </div>
                    <div className="flex flex-row">
                        <div className="w-1/3 mt-1">Valence</div>
                        <div className="w-2/3"><Slider range defaultValue={[25, 75]} onChange={handleValenceChange} /></div>
                    </div>
                </div>
                <div className="w-1/2 text-left">
                    <div className="flex flex-row">
                        <div className="w-1/3 mt-1">Genre</div>
                        <div>
                            <Select
                                showSearch
                                className="w-2/3 w-[200px]"
                                placeholder="Select a genre"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={[
                                ]}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="w-1/3 mt-1">Release Year</div>
                        <div className="w-2/3"><Slider min={1900} max={2022} defaultValue={1960} onChange={handleYearChange} /></div>
                    </div>
                    <div className="flex flex-row">
                        <div className="w-1/3 mt-1">Popularity</div>
                        <div className="w-2/3"><Slider min={0} max={100} defaultValue={50} onChange={handlePopularityChange} /></div>
                    </div>
                    <div className="flex flex-row">
                        <div className="w-1/3 mt-1">Country</div>
                        <div>
                            <Select
                                showSearch
                                className="w-2/3 w-[200px]"
                                placeholder="Select a country"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={[
                                    { value: "United States" },
                                    { value: "United Kingdom" },
                                    { value: "Germany" },
                                    { value: "Japan" },
                                    { value: "France" },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-row justify-center items-center space-x-10">
                <BsFillArrowLeftCircleFill size={30} style={{color: "white", cursor: "pointer"}} onClick={prev} />
                <Result result={results[idx]} />
                <BsFillArrowRightCircleFill size={30} style={{color: "white", cursor: "pointer"}} onClick={next} />
            </div>
        </div>
    );
}

export default Search;