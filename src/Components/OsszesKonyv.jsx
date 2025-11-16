import React from "react";
import { FaTrash } from "react-icons/fa";
import "./Osszkonyvek.css";

const OsszesKonyv = ({ konyvek, setKonyvek, szerkeszto }) => {

  const kezelesOldalValtozas = (id, ujOldal) => {
    setKonyvek((elozo) =>
      elozo.map((k) => {
        if (k.id === id) {
          const aktualis = Number(ujOldal);
          let ujStatusz = k.statusz;
          if (aktualis === 0) ujStatusz = "Nem olvasott";
          else if (aktualis >= k.oldalszam) ujStatusz = "Elolvasva";
          else ujStatusz = "Folyamatban";
          const ujErtekeles = aktualis === 0 ? 0 : k.ertekeles;
          return { ...k, aktualisOldal: aktualis, statusz: ujStatusz, ertekeles: ujErtekeles };
        }
        return k;
      })
    );
  };

  const kezelesTorles = (id) => {
    setKonyvek((elozo) => elozo.filter((k) => k.id !== id));
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
              {szerkeszto && <th>Törlés</th>}
            </tr>
          </thead>
          <tbody>
            {konyvek.map((k) => {
              const haladas = Math.min(((k.aktualisOldal / k.oldalszam) * 100).toFixed(1), 100);
              return (
                <tr key={k.id}>
                  <td>{k.szerzo}</td>
                  <td>{k.cim}</td>
                  <td>
                    {szerkeszto ? (
                      <input
                        type="number"
                        min="0"
                        max={k.oldalszam}
                        value={k.aktualisOldal}
                        onChange={(e) => kezelesOldalValtozas(k.id, e.target.value)}
                        className="oldal-input"
                        title="Jelenlegi oldal"
                      />
                    ) : (
                      k.oldalszam
                    )}
                  </td>
                  <td>
                    <div className="haladas-container">
                      <div className="haladas-felso">
                        <progress value={haladas} max="100" className="haladas-progress"></progress>
                        <span className="haladas-szazalek">{haladas}%</span>
                      </div>
                    </div>
                  </td>
                  <td>{k.mufaj}</td>
                  <td>{k.kiado}</td>
                  <td>{k.statusz}</td>
                  <td className="csillag-cella">
                    <div className="csillag-ertekeles">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span
                          key={n}
                          className={n <= k.ertekeles ? "csillag aktiv" : "csillag"}
                          onClick={() => szerkeszto && k.statusz === "Elolvasva" && kezelesErtekeles(k.id, n)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </td>
                  {szerkeszto && (
                    <td>
                      <button className="delete-gomb" onClick={() => kezelesTorles(k.id)} title="Törlés">
                        <FaTrash />
                      </button>
                    </td>
                  )}
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
