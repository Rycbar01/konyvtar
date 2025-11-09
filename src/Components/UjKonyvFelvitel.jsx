// src/Components/UjKonyvFelvitel.jsx

import React, { useState, useEffect } from 'react';
import './UjKonyvFelvitel.css'; 
import { FaBookMedical, FaSave } from 'react-icons/fa'; 

const UjKonyvFelvitel = () => {
    // Állapotok a felviendő adatoknak
    const [cim, setCim] = useState('');
    const [szerzo, setSzerzo] = useState('');
    const [oldalszam, setOldalszam] = useState('');
    const [mufaj, setMufaj] = useState('');
    const [kiado, setKiado] = useState('');
    const [boritoUrl, setBoritoUrl] = useState('');
    const [statusz, setStatusz] = useState('Olvasásra vár');

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    
    // Kezelő a form elküldéséhez
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!cim || !szerzo || !oldalszam) {
            alert("A cím, szerző és oldalszám mezők kitöltése kötelező!");
            return;
        }

        const ujKonyvAdatok = {
            id: Date.now(), 
            cim: cim.trim(),
            szerzo: szerzo.trim(),
            oldalszam: parseInt(oldalszam) || 0,
            mufaj: mufaj.trim(),
            kiado: kiado.trim(),
            boritoUrl: boritoUrl.trim(),
            statusz: statusz,
            datum: new Date().toLocaleDateString('hu-HU'),
        };

        console.log('--- Új könyv rögzítve (Backendre küldés helyett) ---');
        console.log(ujKonyvAdatok);
        console.log('----------------------------------------------------');

        // Form resetelése
        setCim('');
        setSzerzo('');
        setOldalszam('');
        setMufaj('');
        setKiado('');
        setBoritoUrl('');
        setStatusz('Olvasásra vár'); 

        alert(`Sikeresen rögzítve: ${ujKonyvAdatok.cim}`);
    };

    return (
        <div className="uj-konyv-container">
            {/* RÖGZÍTETT FEJLÉC */}
            <div className="felvitel-fejlec">
                <h2><FaBookMedical /> Új Könyv Felvitele</h2>
            </div>

            <form onSubmit={handleSubmit} className="felvitel-form">
                
                {/* 1. Kötelező adatok */}
                <fieldset className="input-group-fokusz">
                    <legend>Alap adatok</legend>
                    <input
                        type="text"
                        placeholder="Szerző neve"
                        value={szerzo}
                        onChange={(e) => setSzerzo(e.target.value)}
                        className="felvitel-input"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Könyv címe"
                        value={cim}
                        onChange={(e) => setCim(e.target.value)}
                        className="felvitel-input"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Oldalszám"
                        value={oldalszam}
                        onChange={(e) => setOldalszam(e.target.value)}
                        className="felvitel-input small-input"
                        required
                    />
                </fieldset>
                
                {/* 2. Opcionális adatok */}
                <fieldset className="input-group-opcio">
                    <legend>Kiegészítő adatok</legend>
                    <input
                        type="text"
                        placeholder="Műfaj (pl. Fantasy, Életrajz)"
                        value={mufaj}
                        onChange={(e) => setMufaj(e.target.value)}
                        className="felvitel-input"
                    />
                    <input
                        type="text"
                        placeholder="Kiadó"
                        value={kiado}
                        onChange={(e) => setKiado(e.target.value)}
                        className="felvitel-input"
                    />
                    <input
                        type="url"
                        placeholder="Borítókép URL-je (opcionális)"
                        value={boritoUrl}
                        onChange={(e) => setBoritoUrl(e.target.value)}
                        className="felvitel-input"
                    />
                </fieldset>

                {/* 3. Státusz és Mentés */}
                <fieldset className="input-group-státusz">
                    <legend>Státusz és Mentés</legend>
                    <div className="statusz-select-container">
                        <label htmlFor="statusz">Jelenlegi Státusz:</label>
                        <select
                            id="statusz"
                            value={statusz}
                            onChange={(e) => setStatusz(e.target.value)}
                            className="felvitel-select"
                        >
                            <option value="Olvasásra vár">Olvasásra vár</option>
                            <option value="Folyamatban">Folyamatban</option>
                            <option value="Elolvasva">Elolvasva</option>
                            <option value="Meg nem">Meg nem</option>
                        </select>
                    </div>

                    <button type="submit" className="felvitel-gomb save-gomb">
                        <FaSave /> Könyv Mentése
                    </button>
                </fieldset>
            </form>
        </div>
    );
};

export default UjKonyvFelvitel;