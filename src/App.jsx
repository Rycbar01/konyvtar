import React, { useState } from 'react';
import './App.css'; 
import { Routes, Route, Navigate } from 'react-router-dom'; 

import Navbar from './Components/Navbar';
import Home from './Components/Home'; 
import Sidebar from './Components/Sidebar';
import AktualisKonyvek from './Components/AktualisKonyvek';
import EvesOlvasmanyok from './Components/EvesOlvasmanyok';
import OlvasasiTerv from './Components/OlvasasiTerv';
import Kivansaglista from './Components/Kivansaglista';
import UjKonyvFelvitel from './Components/UjKonyvFelvitel';
import OsszesKonyvSzerkesztes from "./Components/OsszesKonyvSzerkesztes";
import Login from './Components/Login';

function App() {
    // Az összes könyv state-je itt van
    const [konyvek, setKonyvek] = useState([
        { id: 101, cim: "Addie LaRue láthatatlan élete", szerzo: "V.E. Schwab", oldalszam: 560, mufaj: "Fantasy", kiado: "Fumax", statusz: "Elolvasva", ertekeles: 5, aktualisOldal: 560 },
        { id: 102, cim: "A lány hét névvel", szerzo: "Hyeonseo Lee", oldalszam: 384, mufaj: "Életrajz", kiado: "Partvonal", statusz: "Elolvasva", ertekeles: 4, aktualisOldal: 384 },
        { id: 103, cim: "Szirmokba zárt szavak", szerzo: "Holly Ringland", oldalszam: 448, mufaj: "Szépirodalom", kiado: "General Press", statusz: "Folyamatban", ertekeles: 3, aktualisOldal: 200 },
        { id: 104, cim: "Ónix vihar", szerzo: "Rebecca Yarros", oldalszam: 480, mufaj: "Fantasy", kiado: "Entangled", statusz: "Nem olvasott", ertekeles: 0, aktualisOldal: 0 },
    ]);
    
    // Autentikációs state
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    // ----------------------------------------------------
    // PRIVATE LAYOUT: A BELÉPETT FELHASZNÁLÓK NÉZETE
    // ----------------------------------------------------
    const PrivateLayout = () => (
        // Itt van a Navbar, Sidebar és a Fő Tartalom konténer
        <div className="App">
            {/* 🟢 MÓDOSÍTÁS: A Navbar már nem kap propot */}
            <Navbar /> 
            
            <main className="content-container">
                <div className="sidebar-header">
                    <h1>📚 My Library</h1>
                </div>

                <div className="page-content-wrapper"> 
                    <Sidebar />

                    {/* A védett oldalak Routes-jai a sidebar mellett */}
                    <Routes>
                        {/* 🟢 MÓDOSÍTÁS: A Home komponens kapja meg a setIsLoggedIn-t */}
                        <Route path="/dashboard" element={<Home setIsLoggedIn={setIsLoggedIn} />} />
                        
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />

                        <Route path="/osszes" element={<OsszesKonyvSzerkesztes konyvek={konyvek} setKonyvek={setKonyvek} />} />
                        <Route path="/ujkonyv" element={<UjKonyvFelvitel konyvek={konyvek} setKonyvek={setKonyvek} />} />
                        <Route path="/aktualis" element={<AktualisKonyvek konyvek={konyvek} setKonyvek={setKonyvek} />} />
                        <Route path="/terv" element={<OlvasasiTerv konyvek={konyvek} setKonyvek={setKonyvek} />} />
                        <Route path="/eves" element={<EvesOlvasmanyok konyvek={konyvek} setKonyvek={setKonyvek} />} />
                        <Route path="/kivansaglista" element={<Kivansaglista konyvek={konyvek} setKonyvek={setKonyvek} />} />
                        
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                </div>
            </main>
        </div>
    );

    // ----------------------------------------------------
    // FŐ ROUTES: BELÉPÉS ÉS VÉDELEM
    // ----------------------------------------------------
    return (
        <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/*" element={isLoggedIn ? <PrivateLayout /> : <Navigate to="/login" replace />} />
        </Routes>
    );
}

export default App;