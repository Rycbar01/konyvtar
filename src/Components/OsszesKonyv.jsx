import React, { useState } from "react";
import "./Osszkonyvek.css";

const kezdetiKonyvek = [
  {
    id: 101,
    cim: "Addie LaRue láthatatlan élete",
    szerzo: "V.E. Schwab",
    oldalszam: 560,
    mufaj: "Fantasy",
    kiado: "Fumax",
    statusz: "Elolvasva",
    ertekeles: 5,
    aktualisOldal: 560,
    boritokepUrl: "src/assets/images/01.jpg",
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
    aktualisOldal: 384,
    boritokepUrl: "src/assets/images/02.jpeg",
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
    aktualisOldal: 200,
    boritokepUrl: "src/assets/images/03.jpg",
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
    aktualisOldal: 0,
    boritokepUrl: "src/assets/images/04.jpg",
  },
];

const csillagokKirajzolasa = (db) => {
  return "★".repeat(db) + "☆".repeat(5 - db);
};

const OsszesKonyv = () => {
  const [konyvek, setKonyvek] = useState(kezdetiKonyvek);

  const kezelesOldalValtozas = (id, ujOldal) => {
    setKonyvek((elozo) =>
      elozo.map((k) =>
        k.id === id ? { ...k, aktualisOldal: Number(ujOldal) } : k
      )
    );
  };

  return (
    <div className="osszes-konyv-container">
      <h2>📖 Összes könyv</h2>
      <table className="konyv-tabla">
        <thead>
          <tr>
            <th>Szerző</th>
            <th>Cím</th>
            <th>Oldalszám</th>
            <th>Előrehaladás</th>
            <th>Műfaj</th>
            <th>Kiadó</th>
            <th>Státusz</th>
            <th>Értékelés</th>
            <th>Borító</th>
          </tr>
        </thead>
        <tbody>
          {konyvek.map((k) => {
            const haladas = Math.min(
              ((k.aktualisOldal / k.oldalszam) * 100).toFixed(1),
              100
            );
            return (
              <tr key={k.id}>
                <td>{k.szerzo}</td>
                <td>{k.cim}</td>
                <td>{k.oldalszam}</td>
                <td>
  <div className="haladas-container">
    <div className="haladas-felso">
      <progress value={haladas} max="100" className="haladas-progress"></progress>
      <span className="haladas-szazalek">{haladas}%</span>
    </div>
    <input
      type="number"
      min="0"
      max={k.oldalszam}
      value={k.aktualisOldal}
      onChange={(e) => kezelesOldalValtozas(k.id, e.target.value)}
      className="oldal-input"
      title="Jelenlegi oldal"
    />
  </div>
</td>

                <td>{k.mufaj}</td>
                <td>{k.kiado}</td>
                <td>
                  {k.statusz === "Elolvasva" && "✅ Elolvasva"}
                  {k.statusz === "Folyamatban" && "⏳ Folyamatban"}
                  {k.statusz === "Nem olvasott" && "❌ Még nem"}
                </td>
                <td>{csillagokKirajzolasa(k.ertekeles)}</td>
                <td>
                  <img
                    src={k.boritokepUrl}
                    alt={k.cim}
                    className="borito-kep"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OsszesKonyv;