import React, {useState, useEffect} from "react";
import { AiOutlineSearch, AiFillHome } from 'react-icons/ai';
import {Slider, Select} from 'antd';
import { getGenres, searchSong, searchArtist, searchAlbum, getExplicitArtists } from '../endpoints';
import { useNavigate, NavLink } from "react-router-dom";

function Search() {

    const navigate = useNavigate();

    const [acousticness, setAcousticness] = useState([25, 75]);
    const [danceability, setDanceability] = useState([25, 75]);
    const [energy, setEnergy] = useState([25, 75]);
    const [instrumentalness, setInstrumentalness] = useState([25, 75]);
    const [loudness, setLoudness] = useState([25, 75]);
    const [valence, setValence] = useState([25, 75]);
    const [year, setYear] = useState(1960);
    const [popularity, setPopularity] = useState(50);
    const [country, setCountry] = useState('');
    const [genre, setGenre] = useState('');
    const [type, setType] = useState('Song');
    const [explicit, setExplicit] = useState('Yes');
    const [query, setQuery] = useState('');

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const loadGenres= async () => {
            const res = await getGenres();
            const g = [];
            res.data.map((item) => {
                g.push({value: item.genre});
            });
            setGenres(g);
        }
        loadGenres();
    }, []);

    const handleAcousticnessChange = (value) => setAcousticness([value[0], value[1]]);
    const handleDanceabilityChange = (value) => setDanceability([value[0], value[1]]);
    const handleEnergyChange = (value) => setEnergy([value[0], value[1]]);
    const handleInstrumentalnessChange = (value) => setInstrumentalness([value[0], value[1]]);
    const handleLoudnessChange = (value) => setLoudness([value[0], value[1]]);
    const handleValenceChange = (value) => setValence([value[0], value[1]]);

    const handleYearChange = (value) => setYear(value);
    const handlePopularityChange = (value) => setPopularity(value);
    const handleCountryChange = (value) => setCountry(value);
    const handleGenreChange = (value) => setGenre(value);
    const handleTypeChange = (value) => setType(value);
    const handleExplicitChange = (value) => setExplicit(value);
    const handleQueryChange = (e) => setQuery(e.target.value);

    const submitSearch = async () => {
        if (type === 'Song') {
            const res = await searchSong(query, 
                acousticness[0], acousticness[1], 
                danceability[0], danceability[1],
                energy[0], energy[1], 
                instrumentalness[0], instrumentalness[1],
                loudness[0], loudness[1], 
                valence[0], valence[1],
                genre, year, popularity, country);
            const formatted = [];
            res.data.map((item) => {
                formatted.push({
                    "track_id": item.track_id,
                    "name": item.track_name,
                    "artist": item.artist_name,
                    "album": item.album_name,
                    "release_date": item.release_date.substring(0, 4),
                    "explicit": item.explicit,
                    "danceability": item.danceability,
                    "energy": item.energy,
                    "loudness": item.loudness,
                    "acousticness": item.acousticness,
                    "instrumentalness": item.instrumentalness,
                    "valence": item.valence,
                    "tempo": item.tempo,
                });
            });
            navigate('/results/song', {state: {results: formatted}});
        } else if (type === 'Artist' && query !== '') {
            const res = await searchArtist(query,
                genre, popularity, country);
            const formatted = [];
            res.data.map((item) => {
                formatted.push({
                    "artist_id": item.artist_id,
                    "name": item.artist_name,
                    "listeners": item.listeners,
                    "country": item.country
                });
            });
            navigate('/results/artist', {state: {results: formatted}});
        } else if (type === 'Artist' && query === '' && explicit === 'Yes') {
            const res = await getExplicitArtists();
            const formatted = [];
            res.data.map((item) => {
                formatted.push({
                    "artist_id": item.artist_id,
                    "name": item.artist_name,
                    "listeners": item.listeners,
                    "country": item.country
                });
            });
            navigate('/results/artist', {state: {results: formatted}});
        } else if (type === 'Album') {
            const res = await searchAlbum(query,
                genre, popularity, country, explicit);
            const formatted = [];
            res.data.map((item) => {
                formatted.push({
                    "album_id": item.album_id,
                    "name": item.album_name,
                });
            });
            navigate('/results/album', {state: {results: formatted}});
        }
    }

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
            <div className="w-[600px] mb-4 h-16 flex flex-row items-center justify-center space-x-4 bg-white mt-10 p-4 rounded-full opacity-90 shadow hover:shadow-2xl ease-in transition-shadow">
                <AiOutlineSearch size={30} />
                <input type="text" value={query} placeholder="Search for a song, artist, or album!" className="w-[500px] outline-none" onChange={handleQueryChange}/>
            </div>
            <div className="w-3/5 bg-white mt-4 mb-2 pl-8 pr-8 pt-4 pb-4 rounded opacity-90 flex flex-row space-x-4">
                <div className="w-1/2 text-left">
                    <div className="flex flex-row">
                        <div className="w-1/3 mt-1">Acousticness</div>
                        <div className="w-1/2 ml-5"><Slider range defaultValue={[25, 75]} onChange={handleAcousticnessChange} /></div>
                    </div>
                    <div className="flex flex-row">
                        <div className="w-1/3 mt-1">Danceability</div>
                        <div className="w-1/2 ml-5"><Slider range defaultValue={[25, 75]} onChange={handleDanceabilityChange} /></div>
                    </div>
                    <div className="flex flex-row">
                        <div className="w-1/3 mt-1">Energy</div>
                        <div className="w-1/2 ml-5"><Slider range defaultValue={[25, 75]} onChange={handleEnergyChange} /></div>
                    </div>
                    <div className="flex flex-row">
                        <div className="w-1/3 mt-1">Instrumentalness</div>
                        <div className="w-1/2 ml-5"><Slider range defaultValue={[25, 75]} onChange={handleInstrumentalnessChange} /></div>
                    </div>
                    <div className="flex flex-row">
                        <div className="w-1/3 mt-1">Loudness</div>
                        <div className="w-1/2 ml-5"><Slider range defaultValue={[25, 75]} onChange={handleLoudnessChange} /></div>
                    </div>
                    <div className="flex flex-row">
                        <div className="w-1/3 mt-1">Valence</div>
                        <div className="w-1/2 ml-5"><Slider range defaultValue={[25, 75]} onChange={handleValenceChange} /></div>
                    </div>
                </div>
                <div className="w-1/2 text-left">
                <div className="flex flex-row mb-1">
                        <div className="w-1/3 mt-1">Search Type *</div>
                        <div>
                            <Select
                                showSearch
                                className="w-2/3 w-[175px]"
                                placeholder="Select a genre"
                                optionFilterProp="children"
                                defaultValue="Song"
                                filterOption={(input, option) =>
                                    (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                onChange={handleTypeChange}
                                options={[
                                    { value: "Song" },
                                    { value: "Artist" },
                                    { value: "Album" },
                                ]}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row mb-1">
                        <div className="w-1/3 mt-1">Genre</div>
                        <div>
                            <Select
                                showSearch
                                className="w-2/3 w-[175px]"
                                placeholder="Select a genre"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                onChange={handleGenreChange}
                                options={genres}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row mb-1">
                        <div className="w-1/3 mt-1">Release Year</div>
                        <div className="w-1/2"><Slider min={1900} max={2022} defaultValue={1960} onChange={handleYearChange} /></div>
                    </div>
                    <div className="flex flex-row mb-1">
                        <div className="w-1/3 mt-1">Popularity</div>
                        <div className="w-1/2"><Slider min={0} max={100} defaultValue={50} onChange={handlePopularityChange} /></div>
                    </div>
                    <div className="flex flex-row mb-1">
                        <div className="w-1/3 mt-1">Country</div>
                        <div>
                            <Select
                                showSearch
                                className="w-2/3 w-[175px]"
                                placeholder="Select a country"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                onChange={handleCountryChange}
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
                    <div className="flex flex-row mb-1">
                        <div className="w-1/3 mt-1">Explicit</div>
                        <div>
                            <Select
                                showSearch
                                className="w-2/3 w-[175px]"
                                placeholder="Select explicitness"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                onChange={handleExplicitChange}
                                options={[
                                    { value: "Yes" },
                                    { value: "No" }
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[100px] h-8 flex flex-row items-center justify-center bg-white mt-10 p-2 rounded opacity-90 shadow hover:shadow-2xl ease-in transition-shadow">
                <button onClick={submitSearch}>Submit</button>
            </div>
        </div>
    );
}

export default Search;