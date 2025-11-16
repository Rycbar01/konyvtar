import React, { useState } from "react";
import "./Osszkonyvek.css";
import { FaTrash } from "react-icons/fa";

const kezdetiKonyvek = [
  { id: 101, cim: "Addie LaRue láthatatlan élete", szerzo: "V.E. Schwab", oldalszam: 560, mufaj: "Fantasy", kiado: "Fumax", statusz: "Elolvasva", ertekeles: 5, aktualisOldal: 560 },
  { id: 102, cim: "A lány hét névvel", szerzo: "Hyeonseo Lee", oldalszam: 384, mufaj: "Életrajz", kiado: "Partvonal", statusz: "Elolvasva", ertekeles: 4, aktualisOldal: 384 },
  { id: 103, cim: "Szirmokba zárt szavak", szerzo: "Holly Ringland", oldalszam: 448, mufaj: "Szépirodalom", kiado: "General Press", statusz: "Folyamatban", ertekeles: 3, aktualisOldal: 200 },
  { id: 104, cim: "Ónix vihar", szerzo: "Rebecca Yarros", oldalszam: 480, mufaj: "Fantasy", kiado: "Entangled", statusz: "Nem olvasott", ertekeles: 0, aktualisOldal: 0 },
  { id: 101, cim: "Addie LaRue láthatatlan élete", szerzo: "V.E. Schwab", oldalszam: 560, mufaj: "Fantasy", kiado: "Fumax", statusz: "Elolvasva", ertekeles: 5, aktualisOldal: 560 },
  { id: 102, cim: "A lány hét névvel", szerzo: "Hyeonseo Lee", oldalszam: 384, mufaj: "Életrajz", kiado: "Partvonal", statusz: "Elolvasva", ertekeles: 4, aktualisOldal: 384 },
  { id: 103, cim: "Szirmokba zárt szavak", szerzo: "Holly Ringland", oldalszam: 448, mufaj: "Szépirodalom", kiado: "General Press", statusz: "Folyamatban", ertekeles: 3, aktualisOldal: 200 },
  { id: 104, cim: "Ónix vihar", szerzo: "Rebecca Yarros", oldalszam: 480, mufaj: "Fantasy", kiado: "Entangled", statusz: "Nem olvasott", ertekeles: 0, aktualisOldal: 0 },
  { id: 101, cim: "Addie LaRue láthatatlan élete", szerzo: "V.E. Schwab", oldalszam: 560, mufaj: "Fantasy", kiado: "Fumax", statusz: "Elolvasva", ertekeles: 5, aktualisOldal: 560 },
  { id: 102, cim: "A lány hét névvel", szerzo: "Hyeonseo Lee", oldalszam: 384, mufaj: "Életrajz", kiado: "Partvonal", statusz: "Elolvasva", ertekeles: 4, aktualisOldal: 384 },
  { id: 103, cim: "Szirmokba zárt szavak", szerzo: "Holly Ringland", oldalszam: 448, mufaj: "Szépirodalom", kiado: "General Press", statusz: "Folyamatban", ertekeles: 3, aktualisOldal: 200 },
  { id: 104, cim: "Ónix vihar", szerzo: "Rebecca Yarros", oldalszam: 480, mufaj: "Fantasy", kiado: "Entangled", statusz: "Nem olvasott", ertekeles: 0, aktualisOldal: 0 },
];

const OsszesKonyv = () => {
  const [konyvek, setKonyvek] = useState(kezdetiKonyvek);

  const kezelesOldalValtozas = (id, ujOldal) => {
    setKonyvek((elozo) =>
      elozo.map((k) => {
        if (k.id === id) {
          const aktualis = Number(ujOldal);
          let ujStatusz = k.statusz;
          if (aktualis === 0) ujStatusz = "Nem olvasott";
          else if (aktualis >= k.oldalszam) ujStatusz = "Elolvasva";
          else ujStatusz = "Folyamatban";
          // Ha még nincs elkezdve, ne legyen értékelés
          const ujErtekeles = aktualis === 0 ? 0 : k.ertekeles;
          return { ...k, aktualisOldal: aktualis, statusz: ujStatusz, ertekeles: ujErtekeles };
        }
        return k;
      })
    );
  };

  const kezelesTorles = (id) => {
    setKonyvek(konyvek.filter((k) => k.id !== id));
  };

  const kezelesErtekeles = (id, ertek) => {
    setKonyvek((elozo) =>
      elozo.map((k) => (k.id === id ? { ...k, ertekeles: ertek } : k))
    );
  };

  return (
    <div className="osszes-konyv-container">
      <div className="osszes-konyv-fejlec">
        <h2>📖 Összes könyv</h2>
      </div>
      <div className="osszes-konyv-tartalom">
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
              <th>Törlés</th>
            </tr>
          </thead>
          <tbody>
            {konyvek.map((k) => {
              const haladas = Math.min(((k.aktualisOldal / k.oldalszam) * 100).toFixed(1), 100);
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
                  <td>{k.statusz}</td>
                  <td>
                  <td className="csillag-cella">
                  <div className="csillag-ertekeles">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span
                        key={n}
                        className={n <= k.ertekeles ? "csillag aktiv" : "csillag"}
                        onClick={() => k.statusz === "Elolvasva" && kezelesErtekeles(k.id, n)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </td>

                </td>


                  <td>
                    <button className="delete-gomb" onClick={() => kezelesTorles(k.id)} title="Törlés">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OsszesKonyv;
