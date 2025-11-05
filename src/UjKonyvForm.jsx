// src/UjKonyvForm.jsx
import React, { useState } from 'react';

function UjKonyvForm() {
  // A useState hook segítségével tároljuk az űrlap adatokat
  const [cim, setCim] = useState('');
  const [szerzo, setSzerzo] = useState('');

  // Ez a függvény fut le, amikor az űrlapot elküldjük
  const handleSubmit = (e) => {
    e.preventDefault(); // Megakadályozza az oldal újratöltését
    
    // Itt kellene az adatokat hozzáadni a könyvek listájához
    // Jelenleg csak kiírjuk a konzolra
    console.log('Új könyv hozzáadva:', { cim, szerzo });

    // Töröljük az űrlap tartalmát a küldés után
    setCim('');
    setSzerzo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="cim">Cím:</label>
        <input
          id="cim"
          type="text"
          value={cim}
          onChange={(e) => setCim(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="szerzo">Szerző:</label>
        <input
          id="szerzo"
          type="text"
          value={szerzo}
          onChange={(e) => setSzerzo(e.target.value)}
        />
      </div>
      <button type="submit">Hozzáadás</button>
    </form>
  );
}

export default UjKonyvForm;