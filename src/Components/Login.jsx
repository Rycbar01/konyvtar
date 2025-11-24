import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 🟢 ÚJ IMPORT: a navigációhoz
import './Login.css';

// 🟢 MÓDOSÍTÁS: Fogadja a setIsLoggedIn prop-ot az App.jsx-ből
const Login = ({ setIsLoggedIn }) => {
    // Navigációs hook
    const navigate = useNavigate();
    
    // Kezeli, hogy a felhasználó a Belépés vagy a Regisztráció nézetet látja-e
    const [isLoginView, setIsLoginView] = useState(true);

    // Form adatok state-jei
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Demo adatok a teszteléshez
    const DEMO_EMAIL = "user@demo.hu";
    const DEMO_PASSWORD = "password";

    const handleSubmit = async (e) => { // 🟢 MÓDOSÍTÁS: aszinkronná tesszük a backend hívásokhoz
        e.preventDefault();

        if (isLoginView) {
            // ❗ BELÉPÉS LOGIKA (valós környezetben itt lenne a fetch/axios a backendhez)
            
            // IDEIGLENES DEMO LOGIKA:
            if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
                
                // 1. Állítsuk a szülő state-et bejelentkezettre
                setIsLoggedIn(true); 
                
                // 2. Navigáljunk a védett oldalra (pl. dashboard)
                navigate('/dashboard', { replace: true }); 
                
            } else {
                alert('Helytelen e-mail cím vagy jelszó! (Demo: user@demo.hu / password)');
            }
            // ---

        } else {
            // ❗ REGISZTRÁCIÓ LOGIKA (itt jönne a fetch/axios a backendhez)
            if (password !== confirmPassword) {
                alert('A jelszavak nem egyeznek!');
                return;
            }
            
            // Itt küldenéd az adatokat a regisztrációs API végpontnak:
            console.log('Regisztrációs adatok:', { email, password });
            alert(`Sikeres regisztrációs kérés küldése: ${email}. Most bejelentkezhet!`);
            
            // Visszaváltás a belépési nézetre
            setIsLoginView(true);
        }
        
        // Form alaphelyzetbe állítása (kivéve a regisztrációs kísérletet)
        setPassword('');
        setConfirmPassword('');
        if(isLoginView) {
            setEmail('');
        }
    };

    return (
        <div className="login-page-container">
            <div className="login-card">
                <h2 className="login-title">
                    {isLoginView ? '👋 Bejelentkezés' : '✨ Regisztráció'}
                </h2>
                <p className="login-subtitle">
                    Kezelje könyveit!
                </p>

                <form onSubmit={handleSubmit} className="login-form">
                    
                    <div className="input-group">
                        <label htmlFor="email">E-mail cím</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="password">Jelszó</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Regisztráció esetén szükséges mező */}
                    {!isLoginView && (
                        <div className="input-group">
                            <label htmlFor="confirmPassword">Jelszó megerősítése</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <button type="submit" className="submit-button">
                        {isLoginView ? 'Belépés' : 'Regisztrálok'}
                    </button>
                </form>

                <div className="switch-text">
                    {isLoginView ? (
                        <p>
                            Nincs még fiókja?{' '}
                            <span 
                                onClick={() => {
                                    setIsLoginView(false);
                                    setEmail('');
                                    setPassword('');
                                }}
                                className="switch-link"
                            >
                                Regisztráljon!
                            </span>
                        </p>
                    ) : (
                        <p>
                            Már van fiókja?{' '}
                            <span 
                                onClick={() => {
                                    setIsLoginView(true);
                                    setEmail('');
                                    setPassword('');
                                }}
                                className="switch-link"
                            >
                                Jelentkezzen be!
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;