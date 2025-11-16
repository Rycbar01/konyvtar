import React, { useEffect, useState } from 'react';
import OlvasasiNaptar from './OlvasasiNaptar';
import './Home.css';

const Home = () => {
    const [konyvek, setKonyvek] = useState([]); // Dinamikus könyvlista
    const [betoltve, setBetoltve] = useState(false);
    const aktualisEv = new Date().getFullYear();

    // -------------------------
    // API hívás a könyvekhez
    // -------------------------
    useEffect(() => {
        // Példa API endpoint
        fetch("/api/konyvek")
            .then(res => res.json())
            .then(data => {
                setKonyvek(data);
                setBetoltve(true);
            })
            .catch(err => {
                console.error("Hiba a könyvek betöltésekor:", err);
                setBetoltve(true);
            });

        // Görgetés letiltása Home oldalon
        window.scrollTo(0, 0);
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'scroll';
        };
    }, []);

    // -------------------------
    // Dinamikus statisztikák
    // -------------------------
    const osszesKonyvSzam = konyvek.length;
    const elolvasvaSzam = konyvek.filter(k => k.statusz === "Elolvasva").length;
    const folyamatbanSzam = konyvek.filter(k => k.statusz === "Folyamatban").length;
    const olvasatlanSzam = osszesKonyvSzam - elolvasvaSzam;
    const gyujtoiArany = osszesKonyvSzam > 0 ? Math.round((olvasatlanSzam / osszesKonyvSzam) * 100) : 0;

    const ideiOlvasasok = konyvek.filter(k => k.statusz === "Elolvasva" && k.ev === aktualisEv);
    const ideiOlvasottKonyvDb = ideiOlvasasok.length;
    const ideiOlvasottOldalDb = ideiOlvasasok.reduce((osszes, k) => osszes + (k.oldalszam || 0), 0);

    // -------------------------
    // Betöltés közben
    // -------------------------
    if (!betoltve) {
        return <div className="loading">Betöltés...</div>;
    }

    return (
        <div className="home-page home-layout-container">
            <div className="home-main-content">
                <h2 className="gyors-statisztikak-cim">Gyors statisztikák</h2>

                <section className="stats-container">
                    <div className="stat-card-group">
                        <div className="stat-card">
                            <h3>Összes könyv</h3>
                            <p className="stat-number">{osszesKonyvSzam}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Folyamatban</h3>
                            <p className="stat-number">{folyamatbanSzam}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Elolvasva</h3>
                            <p className="stat-number">{elolvasvaSzam}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Olvasatlan könyvek</h3>
                            <p className="stat-number">{olvasatlanSzam}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Gyűjtői arány</h3>
                            <p className="stat-number">{gyujtoiArany}%</p>
                        </div>
                        <div className="stat-card">
                            <h3>Idei olvasások</h3>
                            <p className="stat-number">{ideiOlvasottKonyvDb} könyv</p>
                            <p className="stat-number">{ideiOlvasottOldalDb} oldal</p>
                        </div>
                    </div>

                    <OlvasasiNaptar />
                </section>
            </div>
        </div>
    );
};

export default Home;
