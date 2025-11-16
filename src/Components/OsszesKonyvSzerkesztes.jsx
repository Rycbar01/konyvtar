import React, { useState } from "react";
import OsszesKonyv from "./OsszesKonyv";
import "./OsszesKonyvSzerkesztes.css"; // új css import

const OsszesKonyvSzerkesztes = ({ konyvek, setKonyvek }) => {
  const [szerkeszto, setSzerkeszto] = useState(false);

  const toggleSzerkeszto = () => setSzerkeszto(prev => !prev);

  return (
    <div className="szerkesztes-container">
      <div className="szerkesztes-toggle">
        <button onClick={toggleSzerkeszto} className="toggle-gomb">
          {szerkeszto ? "Információs nézet" : "Szerkesztői nézet"}
        </button>
      </div>

      <OsszesKonyv konyvek={konyvek} setKonyvek={setKonyvek} szerkeszto={szerkeszto} />
    </div>
  );
};

export default OsszesKonyvSzerkesztes;
