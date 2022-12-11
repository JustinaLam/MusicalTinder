import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import Search from './components/Search'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  )
}

export default App