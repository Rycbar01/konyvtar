import React, { useEffect, useState } from 'react';
import OlvasasiNaptar from './OlvasasiNaptar';
import './Home.css';

const Home = () => {
    const [konyvek, setKonyvek] = useState([]);
    const [betoltve, setBetoltve] = useState(false);
    const aktualisEv = new Date().getFullYear();
    const aktualisHonap = new Date().getMonth() + 1;

    // -------------------------
    // API hívás
    // -------------------------
    useEffect(() => {
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

        // Home scroll tiltás
        window.scrollTo(0, 0);
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'scroll';
        };
    }, []);

    // -------------------------
    // STATISZTIKÁK AUTOMATIKUSAN
    // -------------------------

    const osszesKonyv = konyvek.length;

    const elolvasva = konyvek.filter(k => k.statusz === "Elolvasva");
    const elolvasvaSzam = elolvasva.length;

    const folyamatbanSzam = konyvek.filter(k => k.statusz === "Folyamatban").length;

    const olvasatlanSzam = konyvek.filter(k => k.statusz === "Nem olvasott").length;

    const gyujtoiArany =
        osszesKonyv > 0 ? Math.round((olvasatlanSzam / osszesKonyv) * 100) : 0;

    // ❗Ha nincs k.ev mező, akkor dátumból számolunk
    const ideiOlvasasok = konyvek.filter(k => {
        if (k.datum) {
            return new Date(k.datum).getFullYear() === aktualisEv;
        }
        if (k.ev) {
            return k.ev === aktualisEv;
        }
        return false;
    });

    const ideiOlvasottKonyvDb = ideiOlvasasok.length;

    const ideiOlvasottOldalDb = ideiOlvasasok.reduce(
        (osszes, k) => osszes + (k.oldalszam || 0),
        0
    );

    // -------------------------
    // BETÖLTÉS
    // -------------------------
    if (!betoltve) {
        return <div className="loading">Betöltés...</div>;
    }

    // -------------------------
    // MEGJELENÍTÉS
    // -------------------------
    return (
        <div className="home-page home-layout-container">
            <div className="home-main-content">
                <h2 className="gyors-statisztikak-cim">Gyors statisztikák</h2>

                <section className="stats-container">
                    <div className="stat-card-group">

                        <div className="stat-card">
                            <h3>Összes könyv</h3>
                            <p className="stat-number">{osszesKonyv}</p>
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
                            <h3>Olvasatlan</h3>
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
