// src/Components/Kivansaglista.jsx

import React, { useState, useMemo } from 'react';
import './Kivansaglista.css'; 
import { FaTrash, FaPlus, FaCheck } from 'react-icons/fa';

// --- Chart importok és regisztráció ---
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

// --- Új Chart Komponens ---
const BookStatusChart = ({ data }) => {
    const chartData = {
        labels: ['Beszerzett (Elolvasott/Folyamatban)', 'Kívánságlistás (Még Nem Beszerzett)'],
        datasets: [
            {
                label: 'Könyvek száma',
                data: [data.beszerzett, data.meg_nem_beszerzett],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.8)', 
                    'rgba(255, 99, 132, 0.8)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#e0e0e0',
                }
            },
            title: {
                display: true,
                text: 'Könyvstátuszok Áttekintése',
                color: '#ffffff',
            },
        },
    };

    return (
        <div className="chart-kontener">
            <Doughnut data={chartData} options={options} />
        </div>
    );
};

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
    const [ujAr, setUjAr] = useState('');

    const handleAddKonyv = (e) => {
        e.preventDefault();
        if (!ujCim.trim() || !ujSzerzo.trim()) return;
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

    const handleDeleteKonyv = (id) => {
        setKonyvek(konyvek.filter(konyv => konyv.id !== id));
    };

    const handleToggleBeszerzett = (id) => {
        setKonyvek(
            konyvek.map(konyv => 
                konyv.id === id ? { ...konyv, beszerzett: !konyv.beszerzett } : konyv
            )
        );
    };

    const osszesAr = konyvek.filter(k => !k.beszerzett).reduce((sum, k) => sum + k.ar, 0);

    // --- Chart Adatok Kiszámítása ---
    const chartStats = useMemo(() => {
        const beszerzett = konyvek.filter(k => k.beszerzett).length;
        const meg_nem_beszerzett = konyvek.filter(k => !k.beszerzett).length;
        
        return {
            beszerzett: beszerzett,
            meg_nem_beszerzett: meg_nem_beszerzett
        };
    }, [konyvek]);

    return (
        // Külső konténer a két oszlopnak
        <div className="page-container">
            
            {/* 1. KÍVÁNSÁGLISTA KONTÉNER (BAL OLDAL - FŐ TARTALOM)
               Megjegyzés: A szélességét a CSS-ben fix 77%-ra kell állítani!
            */}
            <div className="kivansaglista-container">
                <div className="lista-fejlec">
                    <h2>⭐ Kívánságlista</h2>
                    <div className="osszegzes">
                        Még beszerzendő könyvek összértéke: <strong>{osszesAr.toLocaleString('hu-HU')} Ft</strong>
                    </div>
                </div>

                {/* Új könyv felvitele form */}
                {/* Az eredeti className-t használtam: uj-konyv-form-aktualis -> uj-konyv-form */}
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

                {/* Lista tartalom */}
                <div className="lista-tartalom">
                    {konyvek.length === 0 ? (
                        <p className="ures-uzenet">A kívánságlista üres.</p>
                    ) : (
                        konyvek.map((konyv) => (
                            <div key={konyv.id} className={`lista-item ${konyv.beszerzett ? 'beszerzett' : ''}`}>
                                {/* Checkbox */}
                                <label className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        checked={konyv.beszerzett}
                                        onChange={() => handleToggleBeszerzett(konyv.id)}
                                    />
                                    <span className="checkmark">{konyv.beszerzett && <FaCheck />}</span>
                                </label>

                                {/* Cím és Szerző */}
                                <div className="konyv-info">
                                    <span className="konyv-cim">{konyv.cim}</span>
                                    <span className="konyv-szerzo">({konyv.szerzo})</span>
                                </div>

                                {/* Ár */}
                                <div className="ar-display">
                                    {konyv.ar > 0 ? `${konyv.ar.toLocaleString('hu-HU')} Ft` : 'N/A'}
                                </div>

                                {/* Törlés */}
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

            {/* 2. CHART KONTÉNER (JOBB OLDAL) */}
            <div className="chart-oldal-kontener">
                <div className="chart-adatok-box">
                    <h3>📚 Könyvstatisztika</h3>
                    <p>Összes könyv a listán: <strong>{konyvek.length}</strong></p>
                    <hr />
                    <div className="stat-row">
                        <span>✅ Beszerzett:</span>
                        <strong>{chartStats.beszerzett} db</strong>
                    </div>
                    <div className="stat-row">
                        <span>⭐ Kívánságlistás:</span>
                        <strong>{chartStats.meg_nem_beszerzett} db</strong>
                    </div>
                </div>

                <div className="chart-box">
                    <BookStatusChart data={chartStats} />
                </div>
            </div>
        </div>
    );
};

export default Kivansaglista;