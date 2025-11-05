import React from "react";
import KonyvKartyaja from "./KonyvKartya"; // ha ez a könyvkártya komponensed
import './Osszkonyvek.css';
// Ha máshol van a könyvlista, importáljuk onnan.
// Ideiglenesen használjuk ugyanazt a listát, ami a Home-ban is van:
const kiemeltKonyvek = [
  { id: 101, cim: "Addie LaRue láthatatlan élete", szerzo: "V.E. Schwab", boritokepUrl: "src/assets/images/01.jpg" },
  { id: 102, cim: "A lány hét névvel", szerzo: "Hyeonseo Lee", boritokepUrl: "src/assets/images/02.jpeg" },
  { id: 103, cim: "Szirmokba zárt szavak", szerzo: "Holly Ringland", boritokepUrl: "src/assets/images/03.jpg" },
  { id: 104, cim: "Ónix vihar", szerzo: "Rebecca Yarros", boritokepUrl: "src/assets/images/04.jpg" },
];

const OsszesKonyv = () => {
  return (
    <div className="osszes-konyv-container">
      <h1>📚 Összes könyv</h1>
      <div className="konyvlista-grid">
        {kiemeltKonyvek.map((konyv) => (
          <KonyvKartyaja key={konyv.id} konyv={konyv} />
        ))}
      </div>
    </div>
  );
};

export default OsszesKonyv;
