// src/Components/OlvasasiNaptar.jsx

import React, { useState, useMemo } from 'react';
import './OlvasasiNaptar.css';
import Sidebar from './Sidebar';

// Segédfüggvény: Dátum formázása YYYY-MM-DD formátumra
const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

// Segédfüggvény: Egy adott hónap napjainak és az első nap heti indexének kiszámítása
const getCalendarDays = (year, month) => {
    // 0 = Vasárnap, 1 = Hétfő, ...
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Mivel a hétfővel akarunk kezdeni (EU szabvány):
    // 0(V) -> 6, 1(H) -> 0, 2(K) -> 1, ...
    const firstDayIndex = (firstDay.getDay() + 6) % 7; 
    
    return { daysInMonth, firstDayIndex };
};


const OlvasasiNaptar = () => {
    // State: Az olvasott napok dátumai (YYYY-MM-DD formátumban)
    const [olvasottNapok, setOlvasottNapok] = useState([
        '2025-11-01', // Példa adat: ma (2025. nov 1.)
        '2025-10-28',
        '2025-10-29',
        '2025-10-31',
    ]);
    
    // State: Az aktuálisan megjelenített dátum (ezt lehet léptetni)
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const currentMonthName = currentDate.toLocaleString('hu-HU', { month: 'long', year: 'numeric' });

    // Memoizált naptár adatok generálása
    const calendarData = useMemo(() => {
        return getCalendarDays(year, month);
    }, [year, month]);

    // Kattintáskezelő: hozzáadja vagy eltávolítja a napot a listából
    const handleDayClick = (dayDateString) => {
        setOlvasottNapok(prev => {
            if (prev.includes(dayDateString)) {
                // Már olvastam, töröljük
                return prev.filter(d => d !== dayDateString);
            } else {
                // Még nem olvastam, hozzáadjuk
                return [...prev, dayDateString].sort();
            }
        });
    };

    // Navigáció a következő/előző hónapra
    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const days = [];
    const todayString = formatDate(new Date());

    // 1. Üres cellák a hónap elején (hogy Hétfővel kezdődjön a sor)
    for (let i = 0; i < calendarData.firstDayIndex; i++) {
        days.push(<div key={`empty-${i}`} className="naptar-nap ures-nap"></div>);
    }

    // 2. A hónap napjai
    for (let day = 1; day <= calendarData.daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateString = formatDate(date);
        
        const isRead = olvasottNapok.includes(dateString);
        const isToday = dateString === todayString;
        
        // CSS osztályok beállítása
        let classes = "naptar-nap";
        if (isRead) classes += " olvasva";
        if (isToday) classes += " ma";
        
        // Csak a mai és a múltbeli napokat lehet jelölni
        const isClickable = date <= new Date(todayString); // Nem lehet jövőbeli napot jelölni

        days.push(
            <div 
                key={dateString}
                className={classes} 
                onClick={isClickable ? () => handleDayClick(dateString) : null}
                style={{ cursor: isClickable ? 'pointer' : 'default' }}
                title={isClickable ? (isRead ? 'Kijelölés törlése' : 'Olvasva jelölés') : 'Jövőbeli nap'}
            >
                {day}
            </div>
        );
    }

    return (
        <div className="olvasasi-naptar-kontener">

            <h2 className="naptar-focim">Olvasási szokáskövetés</h2>
            
            {/* Navigációs fejléc */}
            <div className="naptar-fejlec">
                <button onClick={handlePrevMonth} className="nav-gomb">&lt;</button>
                <h3>{currentMonthName}</h3>
                <button onClick={handleNextMonth} className="nav-gomb">&gt;</button>
            </div>


            {/* A naptár cellái */}
            <div className="naptar-napok">
                {days}
            </div>
        </div>
    );
};

export default OlvasasiNaptar;