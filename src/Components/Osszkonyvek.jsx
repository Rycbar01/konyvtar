// src/Components/OsszKonyvek.jsx

import React from 'react';
import './OsszKonyvek.css'; 


// Példa adatok a táblázat feltöltéséhez
const peldaKonyvek = [
    { id: 1, cim: "A Gyűrűk Ura", szerzo: "J.R.R. Tolkien", oldalszam: 1178, mufaj: "Fantasy", statusz: "Elolvasva", ertekeles: 5 },
    { id: 2, cim: "Harry Potter és a bölcsek köve", szerzo: "J.K. Rowling", oldalszam: 317, mufaj: "Fantasy", statusz: "Folyamatban", ertekeles: 3 },
    { id: 3, cim: "1984", szerzo: "George Orwell", oldalszam: 328, mufaj: "Disztópia", statusz: "Kívánságlista", ertekeles: 0 },
];

// Segédfüggvény az 5 csillagos értékelés vizuális megjelenítéséhez
const CsillagErtekeles = ({ ertek }) => {
    const csillagok = [];
    for (let i = 1; i <= 5; i++) {
        const csillagOsztaly = i <= ertek ? "csillag tele" : "csillag ures";
        // Fontos a 'key' attribútum a lista elemeknél!
        csillagok.push(<span key={i} className={csillagOsztaly}>★</span>);
    }
    return <div className="ertekeles-kontener">{csillagok}</div>;
};


const OsszKonyvek = () => {
    return (
        <div className="ossz-konyvek-oldal">
            <h1>Összes Könyv Gyűjtemény</h1>
            <p>A táblázat tartalmazza a könyvek főbb adatait, státuszát és értékelését.</p>

            <table className="konyv-tablazat">
                <thead>
                    <tr>
                        <th>Cím</th>
                        <th>Szerző</th>
                        <th>Oldalszám</th>
                        <th>Műfaj</th>
                        <th>Státusz</th>
                        <th>Értékelés (5 csillag)</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Az adatok megjelenítése a peldaKonyvek tömbből (dinamikus listázás) */}
                    {peldaKonyvek.map((konyv) => (
                        <tr key={konyv.id}>
                            <td>{konyv.cim}</td>
                            <td>{konyv.szerzo}</td>
                            <td>{konyv.oldalszam}</td>
                            <td>{konyv.mufaj}</td>
                            <td>{konyv.statusz}</td>
                            <td>
                                <CsillagErtekeles ertek={konyv.ertekeles} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OsszKonyvek;