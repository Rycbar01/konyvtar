import React from 'react';
import { NavLink } from 'react-router-dom'; 
import './Sidebar.css'; 

const Sidebar = () => {
    return (
        
       

        <aside className="main-sidebar">


            



            {/* Quick Links / Gyors Linkek */}
            <div className="sidebar-section quick-links">
                <h3>Linkek</h3>
                <ul>
                    {/* EZ A SOR BIZTOSÍTJA, HOGY A / ÚTVONALRA NAVIGÁLJON: */}
                    <li><NavLink to="/"className={({ isActive }) => isActive ? "active-link" : ""}>🏠 Kezdőlap</NavLink></li> 
                    <li><NavLink to="/osszes"className={({ isActive }) => isActive ? "active-link" : ""}>📖 Összes könyv</NavLink></li> 
                    <li><NavLink to="/aktualis"className={({ isActive }) => isActive ? "active-link" : ""}>⏳ Aktuális olvasmányok</NavLink></li> 
                    <li><NavLink to="/eves" className={({ isActive }) => isActive ? "active-link" : ""}>📆 Éves olvasmányok</NavLink></li>
                    <li><NavLink to="/terv"className={({ isActive }) => isActive ? "active-link" : ""}>💡 Olvasási terv</NavLink></li>
                    <li><NavLink to="/kivansaglista"className={({ isActive }) => isActive ? "active-link" : ""}>⭐ Kívánságlista</NavLink></li>
                </ul>
            </div>

            {/* Quick Actions / Gyors Műveletek */}
            <div className="sidebar-section quick-actions">
                <h3>Gyors műveletek</h3>
                <ul>
                    <li><NavLink to="/ujkonyv"className={({ isActive }) => isActive ? "active-link" : ""}>+ Új könyv felvitele</NavLink></li>
                </ul>
            </div>

        </aside>
    );
};

export default Sidebar;
