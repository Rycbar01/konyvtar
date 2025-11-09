// src/Components/Kivansaglista.jsx

import React, { useState } from 'react';
import './Kivansaglista.css'; // Külön CSS fájl ehhez a komponenshez
import { FaTrash, FaPlus, FaCheck } from 'react-icons/fa';

// Mock/Kezdő adatok
const initialLista = [
    { id: 1, cim: "A sötét anyagok", szerzo: "Philip Pullman", ar: 8990, beszerzett: false },
    { id: 2, cim: "A negyedik szárny", szerzo: "Rebecca Yarros", ar: 6990, beszerzett: true },
    { id: 3, cim: "Ahol a folyami rákok énekelnek", szerzo: "Delia Owens", ar: 4500, beszerzett: false },
];

const Kivansaglista = () => {
    const [konyvek, setKonyvek] = useState(initialLista);
    const [ujCim, setUjCim] = useState('');
    const [ujSzerzo, setUjSzerzo] = useState('');
    const [ujAr, setUjAr] = useState(''); // Ár textként, majd számmá konvertálva

    // --- Műveletek ---

    // 1. Könyv felvitele
    const handleAddKonyv = (e) => {
        e.preventDefault();
        if (!ujCim.trim() || !ujSzerzo.trim()) return;

        // Ár konvertálása számmá, vagy 0, ha üres
        const ar = parseInt(ujAr.trim()) || 0; 
        
        const newKonyv = {
            id: Date.now(),
            cim: ujCim.trim(),
            szerzo: ujSzerzo.trim(),
            ar: ar,
            beszerzett: false,
        };

        setKonyvek([...konyvek, newKonyv]);
        setUjCim('');
        setUjSzerzo('');
        setUjAr('');
    };

    // 2. Könyv törlése
    const handleDeleteKonyv = (id) => {
        setKonyvek(konyvek.filter(konyv => konyv.id !== id));
    };

    // 3. Beszerzett állapot váltása
    const handleToggleBeszerzett = (id) => {
        setKonyvek(
            konyvek.map(konyv => 
                konyv.id === id ? { ...konyv, beszerzett: !konyv.beszerzett } : konyv
            )
        );
    };
    
    // Összes ár kiszámítása
    const osszesAr = konyvek.filter(k => !k.beszerzett).reduce((sum, k) => sum + k.ar, 0);

    return (
        <div className="kivansaglista-container">
            <div className="lista-fejlec">
                <h2>⭐ Kívánságlista</h2>
                <div className="osszegzes">
                    Még beszerzendő könyvek összértéke: <strong>{osszesAr.toLocaleString('hu-HU')} Ft</strong>
                </div>
            </div>

            {/* Új könyv felvitele űrlap */}
            <form onSubmit={handleAddKonyv} className="uj-konyv-form">
                <input
                    type="text"
                    placeholder="Könyv címe"
                    value={ujCim}
                    onChange={(e) => setUjCim(e.target.value)}
                    className="lista-input"
                />
                <input
                    type="text"
                    placeholder="Szerző neve"
                    value={ujSzerzo}
                    onChange={(e) => setUjSzerzo(e.target.value)}
                    className="lista-input"
                />
                <input
                    type="number"
                    placeholder="Ár (Ft)"
                    value={ujAr}
                    onChange={(e) => setUjAr(e.target.value)}
                    className="lista-input ar-input"
                />
                <button type="submit" className="lista-gomb add-gomb">
                    <FaPlus /> Hozzáadás
                </button>
            </form>
            
            <div className="lista-tartalom">
                {konyvek.length === 0 ? (
                    <p className="ures-uzenet">A kívánságlista üres.</p>
                ) : (
                    konyvek.map(konyv => (
                        <div key={konyv.id} className={`lista-item ${konyv.beszerzett ? 'beszerzett' : ''}`}>
                            
                            {/* Checkbox / Státusz */}
                            <label className="checkbox-container">
                                <input
                                    type="checkbox"
                                    checked={konyv.beszerzett}
                                    onChange={() => handleToggleBeszerzett(konyv.id)}
                                />
                                <span className="checkmark">
                                    {konyv.beszerzett && <FaCheck />}
                                </span>
                            </label>

                            {/* Cím és Szerző */}
                            <div className="konyv-info">
                                <span className="konyv-cim">{konyv.cim}</span>
                                <span className="konyv-szerzo">({konyv.szerzo})</span>
                            </div>
                            
                            {/* Ár megjelenítése */}
                            <div className="ar-display">
                                {konyv.ar > 0 ? `${konyv.ar.toLocaleString('hu-HU')} Ft` : 'N/A'}
                            </div>

                            {/* Törlés gomb */}
                            <button 
                                onClick={() => handleDeleteKonyv(konyv.id)} 
                                className="lista-gomb delete-gomb"
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

export default Kivansaglista;