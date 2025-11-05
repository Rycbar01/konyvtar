// src/App.jsx

import React from 'react';
import './App.css'; 
import { Routes, Route } from 'react-router-dom'; 

// Saját komponensek
import Navbar from './Components/Navbar';
import OsszKonyvek from './Components/Osszkonyvek'; 
import Home from './Components/Home'; 
import Sidebar from './Components/Sidebar';


function App() {
  return (
    <div className="App">
      
      {/* 1. Navbar - EZ MINDEN OLDALON FENT MARAD */}
      <Navbar /> 
      
      <main className="content-container">
        
        <div className="global-page-title">
            <h1>📚 My Library</h1>
        </div>

        <div className="page-content-wrapper"> 
        
        {/* 2. OLDALSÁV - EZ LESZ MINDEN OLDALON */}
        <Sidebar />


          {/* 2. ROUTES - Ez a rész változik a navigáláskor */}
          <Routes>
              
              {/* Útvonal 1: Kezdőlap (/) */}
              <Route path="/" element={<Home />} />
              
              {/* Útvonal 2: Összes Könyv (/osszes-konyv) */}
              <Route path="/osszes-konyv" element={<OsszKonyvek />} />
              
              {/* JÖVŐBELI ÚTVONALAK (Helyőrzők a Navbar linkjeihez) */}
              <Route path="/aktualis" element={<h2>Aktuális Olvasmányok Készülnek...</h2>} />
              <Route path="/osszes" element={<h2>Összes könyv...</h2>} />
              <Route path="/terv" element={<h2>Olvasási Terv Készül...</h2>} />
              <Route path="/kivansaglista" element={<h2>Kívánságlista Készül...</h2>} />
              <Route path="/ujkonyv" element={<h2>Új Könyv Felvitele Készül...</h2>} />

          </Routes>

          </div> {/* page-content-wrapper vége */}

      </main>

    </div>
  );
}

export default App;