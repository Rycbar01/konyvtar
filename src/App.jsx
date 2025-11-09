// src/App.jsx

import React from 'react';
import './App.css'; 
import { Routes, Route } from 'react-router-dom'; 

// Saját komponensek
import Navbar from './Components/Navbar';
import OsszKonyvek from './Components/OsszesKonyv'; 
import Home from './Components/Home'; 
import Sidebar from './Components/Sidebar';
import AktualisKonyvek from './Components/AktualisKonyvek';
import EvesOlvasmanyok from './Components/EvesOlvasmanyok';
import OlvasasiTerv from './Components/OlvasasiTerv';



function App() {
  return (
    <div className="App">
      
      {/* 1. Navbar - EZ MINDEN OLDALON FENT MARAD */}
      <Navbar /> 
     
      <main className="content-container">
        
         {/* Fix cím a Sidebar fölött */}
         <div className="sidebar-header">
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
              
              
              {/* JÖVŐBELI ÚTVONALAK (Helyőrzők a Navbar linkjeihez) */}
              <Route path="/aktualis" element={<AktualisKonyvek />} />
              <Route path="/osszes" element={<OsszKonyvek />} />
              <Route path="/terv" element={<OlvasasiTerv />} />
              <Route path="/eves" element={<EvesOlvasmanyok />} />
              <Route path="/kivansaglista" element={<h2>Kívánságlista készül...</h2>} />
              <Route path="/ujkonyv" element={<h2>Új Könyv felvitele készül...</h2>} />

          </Routes>

          </div> {/* page-content-wrapper vége */}

      </main>

    </div>
  );
}

export default App;