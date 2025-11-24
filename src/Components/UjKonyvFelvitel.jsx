// src/Components/UjKonyvFelvitel.jsx

import React, { useState, useEffect } from 'react';
import './UjKonyvFelvitel.css'; 
import { FaBookMedical, FaSave, FaPlusSquare } from 'react-icons/fa'; 

// Kezdő műfajok listája
const KEZDETI_MUFAJOK = [
    'Fantasy', 'Sci-fi', 'Thriller', 'Szépirodalom', 'Életrajz', 'Történelmi'
];

const UjKonyvFelvitel = ({ konyvek, setKonyvek }) => {
    // Űrlap adataihoz tartozó State-ek
    const [cim, setCim] = useState('');
    const [szerzo, setSzerzo] = useState('');
    const [oldalszam, setOldalszam] = useState('');
    const [kiado, setKiado] = useState('');
    const [mufaj, setMufaj] = useState(''); 
    const [statusz, setStatusz] = useState('Olvasásra vár');

    // Műfajkezelő State-ek
    // 🟢 MUFAJOK LISTÁJA: Ezt bővítjük!
    const [muFajokListaja, setMuFajokListaja] = useState(KEZDETI_MUFAJOK);
    // Állapot, ami jelzi, hogy új műfaj felvitele módban vagyunk
    const [isAddingNewMufaj, setIsAddingNewMufaj] = useState(false);
    const [newMufajInput, setNewMufajInput] = useState('');

    // Validációs állapot
    const [isFormValid, setIsFormValid] = useState(false); 


    // -------------------------
    // VALIDÁCIÓ (isFormValid)
    // -------------------------
    useEffect(() => {
        // A Mentés gomb csak akkor aktív, ha minden kötelező mező ki van töltve (beleértve a kiválasztott műfajt is)
        const isValid = 
            cim.trim() !== '' &&
            szerzo.trim() !== '' &&
            oldalszam !== '' && 
            mufaj.trim() !== '' && // A műfaj drop-downnak van érvényes értéke
            kiado.trim() !== '';

        setIsFormValid(isValid);
    }, [cim, szerzo, oldalszam, kiado, mufaj]); 
    
    // -------------------------
    // SCROLL TILTÁS
    // -------------------------
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    
    // -------------------------
    // ÚJ MŰFAJ FUNKCIÓK
    // -------------------------
    const handleAddNewMufaj = () => {
        // Átváltunk a beviteli mezőre
        setIsAddingNewMufaj(true);
        // Töröljük a jelenleg kiválasztott műfajt
        setMufaj(''); 
    };

    const handleSaveNewMufaj = () => {
        const trimmedMufaj = newMufajInput.trim();
        
        if (!trimmedMufaj) {
            // Ha üresen mentené, kilépünk és visszaállunk a select-re
            setIsAddingNewMufaj(false);
            setNewMufajInput('');
            return;
        }

        let finalMufaj = trimmedMufaj;

        if (!muFajokListaja.includes(trimmedMufaj)) {
            // 🟢 MUFAJ HOZZÁADÁSA: Frissítjük a listát, ami a drop-down-t tölti
            setMuFajokListaja(prevList => [...prevList, trimmedMufaj]);
        }
        
        // Beállítjuk az újonnan felvitt/kiválasztott műfajt
        setMufaj(finalMufaj); 
        
        // Visszaállítjuk az állapotot a select mezőre
        setIsAddingNewMufaj(false);
        setNewMufajInput('');
    };

    // -------------------------
    // FORM SUBMIT
    // -------------------------
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!isFormValid) {
             console.error("Hiba: Az űrlap el lett küldve, pedig inaktívnak kellett volna lennie!");
             return; 
        }

        const ujKonyvAdatok = {
            id: Date.now(), 
            cim: cim.trim(),
            szerzo: szerzo.trim(),
            oldalszam: parseInt(oldalszam) || 0,
            mufaj: mufaj,
            kiado: kiado.trim(), 
            
            statusz: statusz,
            aktualisOldal: 0, 
            ertekeles: 0,
            datum: new Date().toLocaleDateString('hu-HU'),
        };

        // Mentés logikája
        setKonyvek([...konyvek, ujKonyvAdatok]);

        // Form reset
        setCim('');
        setSzerzo('');
        setOldalszam('');
        setMufaj(''); 
        setKiado('');
        setStatusz('Olvasásra vár'); 

        alert(`Sikeresen rögzítve: ${ujKonyvAdatok.cim}`);
    };

    // -------------------------
    // MEGJELENÍTÉS
    // -------------------------
    return (
        <div className="uj-konyv-container">
            <div className="felvitel-fejlec">
                <h2><FaBookMedical /> Új Könyv Felvitele</h2>
            </div>

            <form onSubmit={handleSubmit} className="felvitel-form">
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
                
                <fieldset className="input-group-opcio">
                    <legend>Kiegészítő adatok</legend>
                    
                    {/* Műfaj drop-down és Kiadó input egymás mellett */}
                    <div className="felvitel-input-pair">
                        {isAddingNewMufaj ? (
                            // Új műfaj input és Mentés gomb
                            <div className="new-mufaj-input-group">
                                <input
                                    type="text"
                                    placeholder="Írd be az új műfajt"
                                    value={newMufajInput}
                                    onChange={(e) => setNewMufajInput(e.target.value)}
                                    className="felvitel-input"
                                    required
                                />
                                <button type="button" onClick={handleSaveNewMufaj} className="felvitel-gomb new-mufaj-gomb">
                                    <FaSave /> Mentés
                                </button>
                            </div>
                        ) : (
                            // Műfaj select
                            <select
                                id="mufaj"
                                value={mufaj}
                                onChange={(e) => setMufaj(e.target.value)}
                                className="felvitel-select mufaj-select"
                                required
                            >
                                <option value="" disabled>-- Válassz műfajt --</option> 
                                {/* 🟢 MUFAJOK LISTÁJA: Dinamikusan generálódik */}
                                {muFajokListaja.map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                        )}
                        
                        {/* Kiadó input (mindig látható) */}
                        <input
                            type="text"
                            placeholder="Kiadó"
                            value={kiado}
                            onChange={(e) => setKiado(e.target.value)}
                            className="felvitel-input"
                            required
                        />
                    </div>
                </fieldset>

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
                            <option value="Meg nem">Még nem</option>
                        </select>
                    </div>

                    {/* Új műfaj gomb a Mentés gomb BAL oldalán */}
                    <div className="save-button-group">
                        {/* A gomb csak akkor jelenik meg, ha NEM vagyunk az új műfaj felvitele módban */}
                        {!isAddingNewMufaj && (
                            <button type="button" onClick={handleAddNewMufaj} className="felvitel-gomb add-mufaj-gomb">
                                <FaPlusSquare /> Új Műfaj
                            </button>
                        )}
                        <button 
                            type="submit" 
                            className="felvitel-gomb save-gomb"
                            // Letiltva, ha a form nem érvényes VAGY ha épp új műfajt viszünk fel
                            disabled={!isFormValid || isAddingNewMufaj} 
                        >
                            <FaSave /> Könyv Mentése
                        </button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default UjKonyvFelvitel;