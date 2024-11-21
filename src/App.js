import React from 'react';
import { Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Favorite from './components/Favorite';
import './App.css';

function App() {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorite />} />

    </Routes>

  );
}

export default App;
