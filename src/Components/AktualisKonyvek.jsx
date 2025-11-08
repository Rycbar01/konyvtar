import React, { useState } from "react";
import "./Osszkonyvek.css";

const kezdetiAktualis = [
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
];

const AktualisKonyvek = () => {
  const [konyvek, setKonyvek] = useState(kezdetiAktualis);

  const kezelesOldalValtozas = (id, ujOldal) => {
    setKonyvek((elozo) =>
      elozo.map((k) =>
        k.id === id ? { ...k, aktualisOldal: Number(ujOldal) } : k
      )
    );
  };

  return (
    <div className="osszes-konyv-container">
      <h2>⏳ Aktuális olvasmányok</h2>
      <table className="konyv-tabla">
        <thead>
          <tr>
            <th>Szerző</th>
            <th>Cím</th>
            <th>Oldalszám</th>
            <th>Előrehaladás</th>
            <th>Hátralévő oldalak</th>
            <th>Műfaj</th>
            <th>Kiadó</th>
            <th>Státusz</th>
            <th>Borító</th>
          </tr>
        </thead>
        <tbody>
          {konyvek.map((k) => {
            const haladas = Math.min(
              ((k.aktualisOldal / k.oldalszam) * 100).toFixed(1),
              100
            );
            const hatralevoOldal = k.oldalszam - k.aktualisOldal;

            return (
              <tr key={k.id}>
                <td>{k.szerzo}</td>
                <td>{k.cim}</td>
                <td>{k.oldalszam}</td>

                {/* Előrehaladás */}
                <td>
                  <div className="haladas-container">
                    <div className="haladas-felso">
                      <progress value={haladas} max="100" className="haladas-progress" />
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

                {/* Hátralévő oldalak */}
                <td>{hatralevoOldal} oldal</td>

                <td>{k.mufaj}</td>
                <td>{k.kiado}</td>
                <td>⏳</td>

                <td>
                  <img src={k.boritokepUrl} alt={k.cim} className="borito-kep" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AktualisKonyvek;
