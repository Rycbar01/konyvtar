import React, { useState } from 'react';
import './OlvasasiTerv.css';
import { FaTrash, FaPlus, FaCheck } from 'react-icons/fa';

// Mock/Kezdő adatok
const getInitialTerv = () => {
    let baseId = 1;
    const items = [];
    const mintakonyvek = [
        { cim: "A lány hét névvel", szerzo: "Hyeonseo Lee", oldalszam: 384, mufaj: "Regény", olvasva: false },
        { cim: "Szirmokba zárt szavak", szerzo: "Holly Ringland", oldalszam: 448, mufaj: "Romantikus", olvasva: true },
        { cim: "Ónix vihar", szerzo: "Rebecca Yarros", oldalszam: 688, mufaj: "Fantasy", olvasva: false },
    ];

    for (let i = 0; i < 6; i++) {
        mintakonyvek.forEach(k => {
            items.push({ ...k, id: baseId++ });
        });
    }
    return items;
};

const OlvasasiTerv = () => {
    const [tervKonyvek, setTervKonyvek] = useState(getInitialTerv());
    const [ujKonyvCim, setUjKonyvCim] = useState('');
    const [ujKonyvSzerzo, setUjKonyvSzerzo] = useState('');
    const [ujKonyvMufaj, setUjKonyvMufaj] = useState('');
    const [ujKonyvOldalszam, setUjKonyvOldalszam] = useState('');

    const handleAddKonyv = (e) => {
        e.preventDefault();
        if (!ujKonyvCim.trim() || !ujKonyvSzerzo.trim()) return;

        const newKonyv = {
            id: Date.now(),
            cim: ujKonyvCim.trim(),
            szerzo: ujKonyvSzerzo.trim(),
            mufaj: ujKonyvMufaj.trim(),
            oldalszam: parseInt(ujKonyvOldalszam.trim()) || 0,
            olvasva: false,
        };

        setTervKonyvek([...tervKonyvek, newKonyv]);
        setUjKonyvCim('');
        setUjKonyvSzerzo('');
        setUjKonyvMufaj('');
        setUjKonyvOldalszam('');
    };

    const handleDeleteKonyv = (id) => {
        setTervKonyvek(tervKonyvek.filter(k => k.id !== id));
    };

    const handleToggleOlvasva = (id) => {
        setTervKonyvek(
            tervKonyvek.map(k => k.id === id ? { ...k, olvasva: !k.olvasva } : k)
        );
    };

    return (
        <div className="olvasasi-terv-container">
            <div className="terv-fejlec">
                <h2>💡 Olvasási Terv</h2>
            </div>

            {/* Új könyv felvitele */}
            <form onSubmit={handleAddKonyv} className="uj-olvasasiterv-form">
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
                <input
                    type="text"
                    placeholder="Műfaj"
                    value={ujKonyvMufaj}
                    onChange={(e) => setUjKonyvMufaj(e.target.value)}
                    className="terv-input"
                />
                <input
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
        <div className="terv-grid">
            {tervKonyvek.map(k => (
                <div key={k.id} className={`terv-grid-row ${k.olvasva ? 'olvasva' : ''}`}>
                    <div>
                        <label className="checkbox-container">
                            <input
                                type="checkbox"
                                checked={k.olvasva}
                                onChange={() => handleToggleOlvasva(k.id)}
                            />
                            <span className="checkmark">{k.olvasva && <FaCheck />}</span>
                        </label>
                    </div>
                    <div className="konyv-cim">{k.cim}</div>
                    <div className="konyv-szerzo">{k.szerzo}</div>
                    <div className="konyv-mufaj">{k.mufaj || '-'}</div>
                    <div className="oldalszam-display">
                        {k.oldalszam > 0 ? `${k.oldalszam} oldal` : 'N/A'}
                    </div>
                    <div>
                        <button
                            onClick={() => handleDeleteKonyv(k.id)}
                            className="terv-gomb delete-gomb"
                            title="Törlés a listáról"
                        >
                            <FaTrash />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )}
</div>

        </div>
    );
};

export default OlvasasiTerv;
