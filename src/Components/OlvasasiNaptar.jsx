// src/Components/OlvasasiNaptar.jsx

import React, { useState, useMemo, useEffect } from 'react';
import './OlvasasiNaptar.css';

// Segédfüggvény: Dátum formázása YYYY-MM-DD formátumra
const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

// Segédfüggvény: Hónap napjai és első nap indexe
const getCalendarDays = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayIndex = (firstDay.getDay() + 6) % 7; // hétfővel kezdődik
    return { daysInMonth, firstDayIndex };
};

const OlvasasiNaptar = () => {
    // 1️⃣ State: olvasott napok LocalStorage-ból
    const [olvasottNapok, setOlvasottNapok] = useState(() => {
        const saved = localStorage.getItem('olvasottNapok');
        return saved ? JSON.parse(saved) : [];
    });

    // 2️⃣ State: aktuális hónap
    const [currentDate, setCurrentDate] = useState(new Date());
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const currentMonthName = currentDate.toLocaleString('hu-HU', { month: 'long', year: 'numeric' });

    // 3️⃣ Memoizált naptár adatok
    const calendarData = useMemo(() => getCalendarDays(year, month), [year, month]);

    // 4️⃣ Kattintás kezelő: olvasott napok jelölése
    const handleDayClick = (dayDateString) => {
        setOlvasottNapok(prev => {
            const newList = prev.includes(dayDateString)
                ? prev.filter(d => d !== dayDateString)
                : [...prev, dayDateString].sort();
            
            // Mentés LocalStorage-ba
            localStorage.setItem('olvasottNapok', JSON.stringify(newList));
            return newList;
        });
    };

    // 5️⃣ Hónap navigáció
    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const days = [];
    const todayString = formatDate(new Date());

    // 6️⃣ Üres cellák a hónap elején
    for (let i = 0; i < calendarData.firstDayIndex; i++) {
        days.push(<div key={`empty-${i}`} className="naptar-nap ures-nap"></div>);
    }

    // 7️⃣ Hónap napjai
    for (let day = 1; day <= calendarData.daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateString = formatDate(date);
        const isRead = olvasottNapok.includes(dateString);
        const isToday = dateString === todayString;
        const isClickable = date <= new Date(todayString);

        let classes = "naptar-nap";
        if (isRead) classes += " olvasva";
        if (isToday) classes += " ma";

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

            {/* Navigáció */}
            <div className="naptar-fejlec">
                <button onClick={handlePrevMonth} className="nav-gomb">&lt;</button>
                <h3>{currentMonthName}</h3>
                <button onClick={handleNextMonth} className="nav-gomb">&gt;</button>
            </div>

            {/* Naptár */}
            <div className="naptar-napok">
                {days}
            </div>
        </div>
    );
};

export default OlvasasiNaptar;
