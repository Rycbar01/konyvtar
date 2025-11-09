// src/Components/OlvasasiTerv.jsx

import React, { useState } from 'react';
import './OlvasasiTerv.css'; // Külön CSS fájl ehhez a komponenshez
import { FaTrash, FaPlus, FaCheck } from 'react-icons/fa'; // Ikonok használata

// Mock/Kezdő adatok (Kiegészítve oldalszámmal)
const initialTerv = [
    { id: 1, cim: "A lány hét névvel", szerzo: "Hyeonseo Lee", oldalszam: 384, olvasva: false },
    { id: 2, cim: "Szirmokba zárt szavak", szerzo: "Holly Ringland", oldalszam: 448, olvasva: true },
    { id: 3, cim: "Ónix vihar", szerzo: "Rebecca Yarros", oldalszam: 688, olvasva: false },
    // ... a többi ismétlődő könyv adatai frissítve
    { id: 4, cim: "A lány hét névvel", szerzo: "Hyeonseo Lee", oldalszam: 384, olvasva: false },
    { id: 5, cim: "Szirmokba zárt szavak", szerzo: "Holly Ringland", oldalszam: 448, olvasva: true },
    { id: 6, cim: "Ónix vihar", szerzo: "Rebecca Yarros", oldalszam: 688, olvasva: false },
    // ... többi könyv ide
];

// Azért használok különböző ID-ket a listában, mert az 1, 2, 3 ID-k ismétlése hibát okoz a React listákban
const getInitialTerv = () => {
    let baseId = 1;
    const items = [];
    for (let i = 0; i < 6; i++) {
        items.push({ id: baseId++, cim: "A lány hét névvel", szerzo: "Hyeonseo Lee", oldalszam: 384, olvasva: false });
        items.push({ id: baseId++, cim: "Szirmokba zárt szavak", szerzo: "Holly Ringland", oldalszam: 448, olvasva: true });
        items.push({ id: baseId++, cim: "Ónix vihar", szerzo: "Rebecca Yarros", oldalszam: 688, olvasva: false });
    }
    return items;
};


const OlvasasiTerv = () => {
    // Használjuk a listát a konzisztens ID-kért
    const [tervKonyvek, setTervKonyvek] = useState(getInitialTerv()); 
    const [ujKonyvCim, setUjKonyvCim] = useState('');
    const [ujKonyvSzerzo, setUjKonyvSzerzo] = useState('');
    const [ujKonyvOldalszam, setUjKonyvOldalszam] = useState(''); // <-- ÚJ STATE


    // --- Műveletek ---

    // 1. Könyv felvitele
    const handleAddKonyv = (e) => {
        e.preventDefault();
        // Cím és Szerző kötelező
        if (!ujKonyvCim.trim() || !ujKonyvSzerzo.trim()) return; 

        // Oldalszám konvertálása számmá, vagy 0, ha üres
        const oldalszam = parseInt(ujKonyvOldalszam.trim()) || 0; 
        
        const newKonyv = {
            id: Date.now(),
            cim: ujKonyvCim.trim(),
            szerzo: ujKonyvSzerzo.trim(),
            oldalszam: oldalszam, // <-- MENTÉS
            olvasva: false,
        };

        setTervKonyvek([...tervKonyvek, newKonyv]);
        setUjKonyvCim('');
        setUjKonyvSzerzo('');
        setUjKonyvOldalszam(''); // <-- RESET
    };

    // 2. Könyv törlése (marad változatlan)
    const handleDeleteKonyv = (id) => {
        setTervKonyvek(tervKonyvek.filter(konyv => konyv.id !== id));
    };

    // 3. Olvasott állapot váltása (marad változatlan)
    const handleToggleOlvasva = (id) => {
        setTervKonyvek(
            tervKonyvek.map(konyv => 
                konyv.id === id ? { ...konyv, olvasva: !konyv.olvasva } : konyv
            )
        );
    };

    return (
        <div className="olvasasi-terv-container">
            <div className="terv-fejlec">
            <h2>📅 Olvasási Terv</h2>
        </div>

            {/* Új könyv felvitele űrlap */}
            <form onSubmit={handleAddKonyv} className="uj-konyv-form">
                <input
                    type="text"
                    placeholder="Könyv címe"
                    value={ujKonyvCim}
                    onChange={(e) => setUjKonyvCim(e.target.value)}
                    className="terv-input"
                />
                <input
                    type="text"
                    placeholder="Szerző neve"
                    value={ujKonyvSzerzo}
                    onChange={(e) => setUjKonyvSzerzo(e.target.value)}
                    className="terv-input"
                />
                <input // <-- ÚJ INPUT MEZŐ OLDALSZÁMNAK
                    type="number"
                    placeholder="Oldalszám"
                    value={ujKonyvOldalszam}
                    onChange={(e) => setUjKonyvOldalszam(e.target.value)}
                    className="terv-input oldalszam-input"
                />
                <button type="submit" className="terv-gomb add-gomb">
                    <FaPlus /> Hozzáadás
                </button>
            </form>
            
            <div className="terv-lista">
                {tervKonyvek.length === 0 ? (
                    <p className="ures-uzenet">Nincsenek könyvek a tervben.</p>
                ) : (
                    tervKonyvek.map(konyv => (
                        // Megjegyzés: Fontos, hogy a 'key' tulajdonság valóban egyedi legyen. 
                        // Mivel a mock adatoknál ismétlődnek az ID-k, ez hibát okozhat, 
                        // de a getInitialTerv() most próbálja orvosolni.
                        <div key={konyv.id} className={`terv-item ${konyv.olvasva ? 'olvasva' : ''}`}>
                            
                            {/* Checkbox / Státusz */}
                            <label className="checkbox-container">
                                <input
                                    type="checkbox"
                                    checked={konyv.olvasva}
                                    onChange={() => handleToggleOlvasva(konyv.id)}
                                />
                                <span className="checkmark">
                                    {konyv.olvasva && <FaCheck />}
                                </span>
                            </label>

                            {/* Cím és Szerző */}
                            <div className="konyv-info">
                                <span className="konyv-cim">{konyv.cim}</span>
                                <span className="konyv-szerzo">({konyv.szerzo})</span>
                            </div>
                            
                            {/* Oldalszám megjelenítése */}
                            <div className="oldalszam-display">
                                {konyv.oldalszam > 0 ? `${konyv.oldalszam} oldal` : 'N/A'}
                            </div>

                            {/* Törlés gomb */}
                            <button 
                                onClick={() => handleDeleteKonyv(konyv.id)} 
                                className="terv-gomb delete-gomb"
                                title="Törlés a listáról"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default OlvasasiTerv;