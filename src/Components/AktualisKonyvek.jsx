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
  },{
    id: 103,
    cim: "Szirmokba zárt szavak",
    szerzo: "Holly Ringland",
    oldalszam: 448,
    mufaj: "Szépirodalom",
    kiado: "General Press",
    statusz: "Folyamatban",
    ertekeles: 3,
    aktualisOldal: 200,
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
  }
  // … a többi ismétlődőt ide nem írom, mehet ugyanúgy
];

const AktualisKonyvek = () => {
  const [konyvek, setKonyvek] = useState(kezdetiAktualis);

  // --- ÚJ KÖNYV HOZZÁADÁS STATE ---
  const [ujCim, setUjCim] = useState("");
  const [ujSzerzo, setUjSzerzo] = useState("");
  const [ujOldalszam, setUjOldalszam] = useState("");
  const [ujMufaj, setUjMufaj] = useState("");
  const [ujKiado, setUjKiado] = useState("");
  

  const kezelesOldalValtozas = (id, ujOldal) => {
    setKonyvek((elozo) =>
      elozo.map((k) =>
        k.id === id ? { ...k, aktualisOldal: Number(ujOldal) } : k
      )
    );
  };

  // --- KÖNYV HOZZÁADÁS ---
  const kezelesKonyvHozzaadas = (e) => {
    e.preventDefault();

    if (!ujCim.trim() || !ujSzerzo.trim() || !ujOldalszam.trim()) return;

    const ujKonyv = {
      id: Date.now(),
      cim: ujCim,
      szerzo: ujSzerzo,
      oldalszam: Number(ujOldalszam),
      mufaj: ujMufaj || "Ismeretlen",
      kiado: ujKiado || "Ismeretlen",
      statusz: "Folyamatban",
      ertekeles: 0,
      aktualisOldal: 0,
      
    };

    setKonyvek([...konyvek, ujKonyv]);

    setUjCim("");
    setUjSzerzo("");
    setUjOldalszam("");
    setUjMufaj("");
    setUjKiado("");
    
  };

  return (
    <div className="aktualis-konyv-container">
      <div className="osszes-konyv-fejlec">
        <h2>⏳ Aktuális olvasmányok</h2>
      </div>

      {/* --- ÚJ KÖNYV FELVITELE FORM --- */}
      <form onSubmit={kezelesKonyvHozzaadas} className="uj-konyv-form-aktualis">
        <input
          type="text"
          placeholder="Könyv címe"
          value={ujCim}
          onChange={(e) => setUjCim(e.target.value)}
        />
        <input
          type="text"
          placeholder="Szerző"
          value={ujSzerzo}
          onChange={(e) => setUjSzerzo(e.target.value)}
        />
        <input
          type="number"
          placeholder="Oldalszám"
          value={ujOldalszam}
          onChange={(e) => setUjOldalszam(e.target.value)}
        />
        <input
          type="text"
          placeholder="Műfaj"
          value={ujMufaj}
          onChange={(e) => setUjMufaj(e.target.value)}
        />
        <input
          type="text"
          placeholder="Kiadó"
          value={ujKiado}
          onChange={(e) => setUjKiado(e.target.value)}
        />
        
        <button type="submit" className="hozzaad-gomb">
          + Könyv hozzáadása
        </button>
      </form>

      {/* --- TÁBLÁZAT --- */}
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
            {/*<th>Borító</th>*/}
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
                      <progress value={haladas} max="100" className="haladas-progress" />
                      <span className="haladas-szazalek">{haladas}%</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      max={k.oldalszam}
                      value={k.aktualisOldal}
                      onChange={(e) => kezelesOldalValtozas(k.id, e.target.value)}
                    />
                  </div>
                </td>

                <td>{k.oldalszam - k.aktualisOldal} oldal</td>

                <td>{k.mufaj}</td>
                <td>{k.kiado}</td>

                
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AktualisKonyvek;
