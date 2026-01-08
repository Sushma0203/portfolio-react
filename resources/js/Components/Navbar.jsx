import React from 'react';
import { Link } from 'react-router-dom';
import Stars from './Stars';

export default function Navbar() {
    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);

        // Update button text if needed, but in React we usually use state. 
        // For simplicity and direct porting, we rely on the class presence for styling.
        // A reactive state for button text would be better.
    };

    // Simple state to track dark mode text
    const [isDark, setIsDark] = React.useState(false);

    React.useEffect(() => {
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            setIsDark(true);
        }
    }, []);

    const handleToggle = () => {
        toggleDarkMode();
        setIsDark(!isDark);
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container position-relative">
                <Link className="navbar-brand fw-bold position-relative ps-3" to="/home">
                    <img src="/img/sushmalogo.png" width="50" className="me-2" alt="Logo" /> Sushma Thapa
                </Link>
                <button className="navbar-toggler position-relative me-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/projects">Projects</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/gallery">Gallery</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>

                        {/* Dark Mode Button */}
                        <li className="nav-item">
                            <button
                                id="darkModeBtn"
                                className="nav-link bg-transparent border-0"
                                onClick={handleToggle}
                            >
                                {isDark ? 'Light Mode' : 'Dark Mode'}
                            </button>
                        </li>
                    </ul>

                </div>
                {/* Glitter stars overlay */}
                <Stars className="stars" />
            </div>
        </nav>
    );
}
