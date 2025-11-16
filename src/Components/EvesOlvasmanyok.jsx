import React, { useState } from "react";
import "./EvesOlvasmanyok.css";

const EvesOlvasmanyok = () => {
  const [konyvek, setKonyvek] = useState([
    {
      id: 1,
      szerzo: "V.E. Schwab",
      cim: "Addie LaRue láthatatlan élete",
      oldalszam: 560,
      formatum: "Fizikai",
      datum: "2024-02-12",
      ertekeles: 5,
    },
    {
      id: 2,
      szerzo: "Hyeonseo Lee",
      cim: "A lány hét névvel",
      oldalszam: 384,
      formatum: "PDF",
      datum: "2024-03-01",
      ertekeles: 4,
    },
    {
      id: 1,
      szerzo: "V.E. Schwab",
      cim: "Addie LaRue láthatatlan élete",
      oldalszam: 560,
      formatum: "Fizikai",
      datum: "2024-02-12",
      ertekeles: 5,
    },
    {
      id: 2,
      szerzo: "Hyeonseo Lee",
      cim: "A lány hét névvel",
      oldalszam: 384,
      formatum: "PDF",
      datum: "2024-03-01",
      ertekeles: 4,
    },
    {
      id: 1,
      szerzo: "V.E. Schwab",
      cim: "Addie LaRue láthatatlan élete",
      oldalszam: 560,
      formatum: "Fizikai",
      datum: "2024-02-12",
      ertekeles: 5,
    },
    {
      id: 2,
      szerzo: "Hyeonseo Lee",
      cim: "A lány hét névvel",
      oldalszam: 384,
      formatum: "PDF",
      datum: "2024-03-01",
      ertekeles: 4,
    },
    {
      id: 1,
      szerzo: "V.E. Schwab",
      cim: "Addie LaRue láthatatlan élete",
      oldalszam: 560,
      formatum: "Fizikai",
      datum: "2024-02-12",
      ertekeles: 5,
    },
    {
      id: 2,
      szerzo: "Hyeonseo Lee",
      cim: "A lány hét névvel",
      oldalszam: 384,
      formatum: "PDF",
      datum: "2024-03-01",
      ertekeles: 4,
    },
    {
      id: 1,
      szerzo: "V.E. Schwab",
      cim: "Addie LaRue láthatatlan élete",
      oldalszam: 560,
      formatum: "Fizikai",
      datum: "2024-02-12",
      ertekeles: 5,
    },
    {
      id: 2,
      szerzo: "Hyeonseo Lee",
      cim: "A lány hét névvel",
      oldalszam: 384,
      formatum: "PDF",
      datum: "2024-03-01",
      ertekeles: 4,
    },
    {
      id: 1,
      szerzo: "V.E. Schwab",
      cim: "Addie LaRue láthatatlan élete",
      oldalszam: 560,
      formatum: "Fizikai",
      datum: "2024-02-12",
      ertekeles: 5,
    },
    {
      id: 2,
      szerzo: "Hyeonseo Lee",
      cim: "A lány hét névvel",
      oldalszam: 384,
      formatum: "PDF",
      datum: "2024-03-01",
      ertekeles: 4,
    },
  ]);

  // Formátum opciók
  const formatumok = ["Fizikai", "PDF", "Fizikai/PDF", "Kölcsönzött"];

  // Új könyv hozzáadás form state
  const [ujSzerzo, setUjSzerzo] = useState("");
  const [ujCim, setUjCim] = useState("");
  const [ujOldalszam, setUjOldalszam] = useState("");
  const [ujFormatum, setUjFormatum] = useState(formatumok[0]);
  const [ujDatum, setUjDatum] = useState("");
  const [ujErtekeles, setUjErtekeles] = useState(0);

  // --- Új könyv hozzáadása ---
  const kezelesKonyvHozzaadas = (e) => {
    e.preventDefault();
    if (!ujSzerzo.trim() || !ujCim.trim() || !ujOldalszam.trim()) return;

    const ujKonyv = {
      id: Date.now(),
      szerzo: ujSzerzo,
      cim: ujCim,
      oldalszam: Number(ujOldalszam),
      formatum: ujFormatum,
      datum: ujDatum || new Date().toISOString().split("T")[0],
      ertekeles: Number(ujErtekeles),
    };

    setKonyvek([...konyvek, ujKonyv]);

    // Form reset
    setUjSzerzo("");
    setUjCim("");
    setUjOldalszam("");
    setUjFormatum(formatumok[0]);
    setUjDatum("");
    setUjErtekeles(0);
  };

  // Értékelés csillagok kirajzolása
  const csillagokKirajzolasa = (db) => "★".repeat(db) + "☆".repeat(5 - db);

  return (
    <div className="eves-olvasmanyok-container">
      <div className="eves-konyv-fejlec">
        <h2>📆 Éves Olvasmányok</h2>
      </div>

      {/* --- ÚJ KÖNYV FELVITELE FORM --- */}
      <form onSubmit={kezelesKonyvHozzaadas} className="uj-konyv-form-eves">
        <input
          type="text"
          placeholder="Szerző"
          value={ujSzerzo}
          onChange={(e) => setUjSzerzo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cím"
          value={ujCim}
          onChange={(e) => setUjCim(e.target.value)}
        />
        <input
          type="number"
          placeholder="Oldalszám"
          value={ujOldalszam}
          onChange={(e) => setUjOldalszam(e.target.value)}
        />
        <select
          value={ujFormatum}
          onChange={(e) => setUjFormatum(e.target.value)}
        >
          {formatumok.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={ujDatum}
          onChange={(e) => setUjDatum(e.target.value)}
        />
        <input
          type="number"
          min="0"
          max="5"
          placeholder="Értékelés"
          value={ujErtekeles}
          onChange={(e) => setUjErtekeles(e.target.value)}
        />
        <button type="submit" className="hozzaad-gomb">
          + Hozzáadás
        </button>
      </form>

      {/* --- TÁBLÁZAT --- */}
      <table className="konyv-tabla">
        <thead>
          <tr>
            <th>#</th>
            <th>Szerző</th>
            <th>Cím</th>
            <th>Formátum</th>
            <th>Oldalszám</th>
            <th>Értékelés</th>
            <th>Befejezve</th>
          </tr>
        </thead>
        <tbody>
          {konyvek.map((k, index) => (
            <tr key={k.id}>
              <td>{index + 1}</td>
              <td>{k.szerzo}</td>
              <td>{k.cim}</td>
              <td>
                <select
                  value={k.formatum}
                  onChange={(e) =>
                    setKonyvek((elozo) =>
                      elozo.map((k2) =>
                        k2.id === k.id ? { ...k2, formatum: e.target.value } : k2
                      )
                    )
                  }
                  className="formatum-select"
                >
                  {formatumok.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </td>
              <td>{k.oldalszam}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={k.ertekeles}
                  onChange={(e) =>
                    setKonyvek((elozo) =>
                      elozo.map((k2) =>
                        k2.id === k.id
                          ? { ...k2, ertekeles: Number(e.target.value) }
                          : k2
                      )
                    )
                  }
                  className="ertekeles-input"
                />
              </td>
              <td>
                <input
                  type="date"
                  value={k.datum}
                  onChange={(e) =>
                    setKonyvek((elozo) =>
                      elozo.map((k2) =>
                        k2.id === k.id ? { ...k2, datum: e.target.value } : k2
                      )
                    )
                  }
                  className="datum-input"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EvesOlvasmanyok;
