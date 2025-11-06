// src/Components/OsszesKonyv.jsx

import React from "react";
import "./Osszkonyvek.css";

const konyvek = [
  { 
    id: 101, 
    cim: "Addie LaRue láthatatlan élete", 
    szerzo: "V.E. Schwab", 
    oldalszam: 560,
    mufaj: "Fantasy",
    kiado: "Fumax",
    statusz: "Elolvasva", // lehet: "Elolvasva", "Folyamatban", "Nem olvasott"
    ertekeles: 5, // 1-5
    boritokepUrl: "src/assets/images/01.jpg"
  },
  { 
    id: 102, 
    cim: "A lány hét névvel", 
    szerzo: "Hyeonseo Lee", 
    oldalszam: 384,
    mufaj: "Életrajz",
    kiado: "Partvonal",
    statusz: "Elolvasva",
    ertekeles: 4,
    boritokepUrl: "src/assets/images/02.jpeg"
  },
  { 
    id: 103, 
    cim: "Szirmokba zárt szavak", 
    szerzo: "Holly Ringland", 
    oldalszam: 448,
    mufaj: "Szépirodalom",
    kiado: "General Press",
    statusz: "Folyamatban",
    ertekeles: 3,
    boritokepUrl: "src/assets/images/03.jpg"
  },
  { 
    id: 104, 
    cim: "Ónix vihar", 
    szerzo: "Rebecca Yarros", 
    oldalszam: 480,
    mufaj: "Fantasy",
    kiado: "Entangled",
    statusz: "Nem olvasott",
    ertekeles: 0,
    boritokepUrl: "src/assets/images/04.jpg"
  },
];

const csillagokKirajzolasa = (db) => {
  return "★".repeat(db) + "☆".repeat(5 - db);
};

const OsszesKonyv = () => {
  return (
    <div className="osszes-konyv-container">
      <h1>📚 Összes könyv</h1>

      <table className="konyv-tabla">
        <thead>
          <tr>
            <th>Szerző</th>
            <th>Cím</th>
            <th>Oldalszám</th>
            <th>Műfaj</th>
            <th>Kiadó</th>
            <th>Státusz</th>
            <th>Értékelés</th>
            <th>Borító</th>
          </tr>
        </thead>
        <tbody>
          {konyvek.map((k) => (
            <tr key={k.id}>
              <td>{k.szerzo}</td>
              <td>{k.cim}</td>
              <td>{k.oldalszam}</td>
              <td>{k.mufaj}</td>
              <td>{k.kiado}</td>
              <td>
                {k.statusz === "Elolvasva" && "✅ Elolvasva"}
                {k.statusz === "Folyamatban" && "⏳ Folyamatban"}
                {k.statusz === "Nem olvasott" && "❌ Még nem"}
              </td>
              <td>{csillagokKirajzolasa(k.ertekeles)}</td>
              <td>
                <img src={k.boritokepUrl} alt={k.cim} className="borito-kep" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OsszesKonyv;
