import React, { useState } from 'react';
import './App.css'; 
import { Routes, Route } from 'react-router-dom'; 

import Navbar from './Components/Navbar';
import Home from './Components/Home'; 
import Sidebar from './Components/Sidebar';
import AktualisKonyvek from './Components/AktualisKonyvek';
import EvesOlvasmanyok from './Components/EvesOlvasmanyok';
import OlvasasiTerv from './Components/OlvasasiTerv';
import Kivansaglista from './Components/Kivansaglista';
import UjKonyvFelvitel from './Components/UjKonyvFelvitel';
import OsszesKonyvSzerkesztes from "./Components/OsszesKonyvSzerkesztes"; // új szerkesztő nézet

function App() {
  // Az összes könyv state-je itt van
  const [konyvek, setKonyvek] = useState([
    { id: 101, cim: "Addie LaRue láthatatlan élete", szerzo: "V.E. Schwab", oldalszam: 560, mufaj: "Fantasy", kiado: "Fumax", statusz: "Elolvasva", ertekeles: 5, aktualisOldal: 560 },
    { id: 102, cim: "A lány hét névvel", szerzo: "Hyeonseo Lee", oldalszam: 384, mufaj: "Életrajz", kiado: "Partvonal", statusz: "Elolvasva", ertekeles: 4, aktualisOldal: 384 },
    { id: 103, cim: "Szirmokba zárt szavak", szerzo: "Holly Ringland", oldalszam: 448, mufaj: "Szépirodalom", kiado: "General Press", statusz: "Folyamatban", ertekeles: 3, aktualisOldal: 200 },
    { id: 104, cim: "Ónix vihar", szerzo: "Rebecca Yarros", oldalszam: 480, mufaj: "Fantasy", kiado: "Entangled", statusz: "Nem olvasott", ertekeles: 0, aktualisOldal: 0 },
  ]);

  return (
    <div className="App">
      <Navbar /> 
     
      <main className="content-container">
         <div className="sidebar-header">
           <h1>📚 My Library</h1>
         </div>

        <div className="page-content-wrapper"> 
          <Sidebar />

          <Routes>
              <Route path="/" element={<Home />} />

              {/* Összes könyv oldal → toggle gomb a szerkesztő/információs nézethez */}
              <Route path="/osszes" element={<OsszesKonyvSzerkesztes konyvek={konyvek} setKonyvek={setKonyvek} />} />

              {/* Új könyv felvitel → átadjuk a state-et */}
              <Route path="/ujkonyv" element={<UjKonyvFelvitel konyvek={konyvek} setKonyvek={setKonyvek} />} />

              <Route path="/aktualis" element={<AktualisKonyvek konyvek={konyvek} setKonyvek={setKonyvek} />} />
              <Route path="/terv" element={<OlvasasiTerv konyvek={konyvek} setKonyvek={setKonyvek} />} />
              <Route path="/eves" element={<EvesOlvasmanyok konyvek={konyvek} setKonyvek={setKonyvek} />} />
              <Route path="/kivansaglista" element={<Kivansaglista konyvek={konyvek} setKonyvek={setKonyvek} />} />
              
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
