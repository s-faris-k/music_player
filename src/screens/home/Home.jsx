import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Library from '../library/Library';
import Search from '../search/Search';
import Player from '../player/Player';
import Online from '../online/Online';
import './home.css';
import Sidebar from '../../components/sidebar/Sidebar';


export default function Home() {
  return (
    <Router>
      <div className='main-body'>
        <Sidebar />
          <Routes>
            <Route path="/" element={<Online />} />
            <Route path="/online" element={<Online />} />
            <Route path="/library" element={<Library />} />
            <Route path="/search" element={<Search />} />
            <Route path="/player" element={<Player />} />
          </Routes>

      </div>
   </Router>
  )
}
