import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import Search from './components/Search'

function App() {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const REDIRECT_URI = "http://localhost:3000/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [hasToken, setHasToken] = useState(null)

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }
    setHasToken(!!token)
  }, [])

  const logout = () => {
    window.localStorage.removeItem("token")
    window.location.href = REDIRECT_URI
  }

  return ( 
    <div>
      <div className='w-screen flex justify-center py-2 bg-slate-100'>
      {hasToken ? 
        <button onClick={logout}>Logout of Spotify</button> :
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
      }
      </div>
      {hasToken && 
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      }
    </div>
  )
}

export default App