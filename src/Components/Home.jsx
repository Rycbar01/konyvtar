// src/Components/Home.jsx

import React, { useState, useEffect } from 'react'; 
import KonyvKartyaja from './KonyvKartya';
import OlvasasiNaptar from './OlvasasiNaptar';
import './Home.css';


// -----------------------------------------------------------
// A KonyvModal Külön Komponens (vagy itt, a Home felett)
// -----------------------------------------------------------

// A felugró ablak komponense
const KonyvModal = ({ konyv, onClose }) => {
    if (!konyv) return null; 

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>&times;</button>
                
                <h2>{konyv.cim}</h2>
                <h3 className="modal-szerzo">{konyv.szerzo}</h3>
                
                <div className="modal-tartalom">
                    <img 
                        src={konyv.boritokepUrl || 'https://via.placeholder.com/150x220?text=Borítókép'} 
                        alt={konyv.cim} 
                        className="modal-borito" 
                    />
                    
                    <div className="modal-leiras">
                        <div className="modal-stat">
                            <p>
                                <strong>Oldalszám:</strong> {konyv.oldalszam || 'N/A'}
                            </p>
                            <p className="moly-ertekeles">
                                <strong>Moly.hu Értékelés:</strong> 
                                <span className="ertekeles-szam">{konyv.molyErtekeles || 'N/A'}%</span>
                            </p>
                        </div>
                        
                        <p className="teljes-leiras-modal">{konyv.leiras}</p>
                        
                    </div>
                </div>
                
                <button className="olvasasi-gomb modal-gomb">Státusz Frissítése</button>
            </div>
        </div>
    );
};


// -----------------------------------------------------------
// Mock Adatok (Kiegészítve a Modalhoz szükséges mezőkkel)
// -----------------------------------------------------------

const osszesKonyvSzam = 124; // Példa: összes könyv
const elolvasvaSzam = 32;   // Példa: elolvasott könyv

// Számítások
const olvasatlanSzam = osszesKonyvSzam - elolvasvaSzam;
const gyujtoiArany = Math.round((olvasatlanSzam / osszesKonyvSzam) * 100);

// Elolvasott könyvek mock adat (később jöhet adatbázisból)
const elolvasottKonyvek = [
    { id: 1, cim: "Addie LaRue láthatatlan élete", oldalszam: 560, ev: 2024 },
    { id: 2, cim: "A lány hét névvel", oldalszam: 384, ev: 2024 },
    { id: 3, cim: "Szirmokba zárt szavak", oldalszam: 448, ev: 2023 },
    { id: 4, cim: "Másik könyv", oldalszam: 300, ev: 2024 },
];

const aktualisEv = new Date().getFullYear();

// Aktuális évben elolvasott könyvek
const ideiOlvasasok = elolvasottKonyvek.filter(k => k.ev === aktualisEv);

// Hány könyv?
const ideiOlvasottKonyvDb = ideiOlvasasok.length;

// Hány oldal?
const ideiOlvasottOldalDb = ideiOlvasasok.reduce((osszes, konyv) => osszes + (konyv.oldalszam || 0), 0);




const kiemeltKonyvek = [
  { 
      id: 101, 
      cim: "Addie LaRue láthatatlan élete", 
      szerzo: "V.E. Schwab", 
      leiras: "Franciaország, 1714: egy fiatal nő végső elkeseredettségben fausti alkut köt az ördöggel, hogy örökké éljen, ám ezért cserébe súlyos árat fizet. Az ördög megfosztja a világban elfoglalt helyétől, és arra kárhoztatja, hogy mindenki elfelejtse, akivel találkozik.",
      boritokepUrl: "src/assets/images/01.jpg",
      oldalszam: 560, // Kiegészítve
      molyErtekeles: 94 // Kiegészítve
  },
  { 
      id: 102, 
      cim: "A lány hét névvel", 
      szerzo: "Hyeonseo Lee", 
      leiras: "Hyeonseo Lee Észak-Koreában, a világ egyik legkegyetlenebb diktatúrájában töltötte gyermekkorát. Egyike annak a több millió embernek, akit túszul ejtett a titkolózó, brutális kommunista rezsim. Amikor az 1990-es években lesújtott Észak-Koreára az éhínség, ráébredt, hogy egész életében agymosáson ment keresztül.",
      boritokepUrl: "src/assets/images/02.jpeg",
      oldalszam: 384, // Kiegészítve
      molyErtekeles: 92 // Kiegészítve
  },
{ 
        id: 102, 
        cim: "Ónix vihar", 
        szerzo: "Rebecca Yarros", 
        leiras: "Miután majdnem másfél évet töltött a Basgiath Hadi Iskola falai között, Violet Sorrengail tisztában van vele, hogy már nincs idő elméleteket gyártani. És nincs már több idő a bizonytalankodásra sem.",
        boritokepUrl: "src/assets/images/04.jpg",
        oldalszam: 384, // Kiegészítve
        molyErtekeles: 92 // Kiegészítve
    },
  { 
      id: 103, 
      cim: "Szirmokba zárt szavak", 
      szerzo: "Holly Ringland", 
      leiras: "A kilencéves Alice Hart a világtól elszigetelten él a tenger partján, ahol édesanyja elbűvölő virágai és azok titkos történetei megóvják bántalmazó apjától.",
      boritokepUrl: "src/assets/images/03.jpg",
      oldalszam: 448, // Kiegészítve
      molyErtekeles: 89 // Kiegészítve
  }
];


// -----------------------------------------------------------
// HOME KOMPONENS
// -----------------------------------------------------------

const Home = () => {

    
    // State: A modal által kiválasztott könyv ID-jének tárolása (null = modal zárva)
    const [kivalasztottKonyvId, setKivalasztottKonyvId] = useState(null);


   // GÖRGETÉS LETILTÁSA ÉS NULLÁZÁSA
   useEffect(() => {
    // 1. Ablak görgetési pozíció nullázása
    window.scrollTo(0, 0); 
    
    // 2. A teljes dokumentum (ha van) görgetési pozíciójának nullázása
    document.documentElement.scrollTop = 0; 
    document.body.scrollTop = 0;
    
    // 3. Görgetés letiltása a Home oldalon
    document.body.style.overflow = 'hidden';

    return () => {
        document.body.style.overflow = 'scroll';
    };
}, []);
    
    // Függvény a modal megnyitásához
    const handleOpenModal = (id) => {
        setKivalasztottKonyvId(id);
    };
    
    // Függvény a modal bezárásához
    const handleCloseModal = () => {
        setKivalasztottKonyvId(null);
    };

    // Megkeressük a könyv adatait a modalhoz (ami a kiválasztott ID-hez tartozik)
    const konyvAdat = kiemeltKonyvek.find(k => k.id === kivalasztottKonyvId);

    return (
      <div className="home-page home-layout-container"> 
      
      
      {/* 2. FŐ TARTALOM (Jobb oldali oszlop, tartalmazza a Statisztikákat, Naptárat és Könyveket) */}
      <div className="home-main-content">
        

          <h2 className="gyors-statisztikak-cim">Gyors statisztikák</h2>
          
          {/* Statisztikák */}
          <section className="stats-container">


            {/* ÚJ KONTÉNER A 6 KÁRTYÁNAK */}
            <div className="stat-card-group">
              
              {/* Statisztikai kártyák */}
              <div className="stat-card"><h3>Összes könyv</h3><p className="stat-number">124</p></div>
              <div className="stat-card"><h3>Folyamatban</h3><p className="stat-number">0</p></div>
              <div className="stat-card"><h3>Elolvasva</h3><p className="stat-number">32</p></div>
              <div className="stat-card"><h3>Olvasatlan könyvek</h3><p className="stat-number">{olvasatlanSzam}</p></div>
              <div className="stat-card"><h3>Gyűjtői arány</h3><p className="stat-number">{gyujtoiArany}%</p></div>
              <div className="stat-card"><h3>Idei olvasások</h3><p className="stat-number">{ideiOlvasottKonyvDb} könyv</p>
                                                                <p className="stat-number">{ideiOlvasottOldalDb} oldal</p>
              </div>

            </div> {/* stat-card-group vége */}

              {/* MINI NAPTÁR (SZOKÁSKÖVETŐ) */}
              <OlvasasiNaptar /> 
          </section>


          <section className="stats-container">
                

            </section>


          {/* Könyvkártyák */}
         
          
      </div> {/* home-main-content vége */}


      

      {/* MODAL MEGJELENÍTÉSE */}
      <KonyvModal 
          konyv={konyvAdat} 
          onClose={handleCloseModal} 
      />
      
  </div>
    );
}; 

export default Home;