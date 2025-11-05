// src/Konyvek.jsx
import React, { useState } from 'react';

function Konyvek() {
  const [konyvek, setKonyvek] = useState([
    {
      id: 1,
      cim: 'A Gyűrűk Ura',
      szerzo: 'J.R.R. Tolkien',
      kiolvasva: false,
    },
    {
      id: 2,
      cim: 'Harry Potter és a bölcsek köve',
      szerzo: 'J.K. Rowling',
      kiolvasva: true,
    },
  ]);

  return (
    <div>
      <h2>Könyveim listája</h2>
      {konyvek.map((konyv) => (
        <div key={konyv.id}>
          <h3>{konyv.cim}</h3>
          <p>Szerző: {konyv.szerzo}</p>
          <p>{konyv.kiolvasva ? 'Kiolvasva' : 'Még olvasatlan'}</p>
        </div>
      ))}
    </div>
  );
}

export default Konyvek;