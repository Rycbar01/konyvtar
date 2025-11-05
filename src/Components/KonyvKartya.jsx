// src/Components/KonyvKartyaja.jsx

import React from 'react';
import './KonyvKartya.css'; // Külön CSS fájlt használunk

const KonyvKartyaja = ({ cim, szerzo, leiras, boritokepUrl }) => {
    return (
        <div className="konyv-kartya">
            <div className="boritokep-kontener">
                {/* FIGYELEM: Mivel nincs tényleges borítóképed, 
                   itt most egy helyőrző képet használunk, vagy egy üres div-et. 
                   Később ide kerül a boritokepUrl alapján töltött kép!
                */}
                <img 
                    src={boritokepUrl || 'https://via.placeholder.com/150x220?text=Borítókép'} 
                    alt={`Borítókép: ${cim}`} 
                    className="boritokep" 
                />
            </div>
            <div className="kartya-tartalom">
                <h3>{cim}</h3>
                <p className="kartya-szerzo">{szerzo}</p>
                <p className="kartya-leiras">{leiras}</p>
                <button className="olvasasi-gomb">Érdekel</button>
            </div>
        </div>
    );
};

export default KonyvKartyaja;