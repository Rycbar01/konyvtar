// src/Components/EvesOlvasmanyok.jsx

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
  ]);

  // Formátum opciók
  const formatumok = ["Fizikai", "PDF", "Fizikai/PDF", "Kölcsönzött"];

  // Értékelés csillagokkal
  const csillagokKirajzolasa = (db) => "★".repeat(db) + "☆".repeat(5 - db);

  return (
    <div className="eves-olvasmanyok-container">
      <h2>📆 Éves Olvasmányok</h2>
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
              <td>{csillagokKirajzolasa(k.ertekeles)}</td>
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