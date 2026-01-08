'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Stars from './Stars';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            setIsDark(true);
        }
    }, []);

    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
        const isNowDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isNowDark.toString());
        setIsDark(isNowDark);
    };

    const isActive = (path: string) => pathname === path ? 'active' : '';

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container position-relative">
                <Link className="navbar-brand fw-bold position-relative ps-3" href="/" style={{ color: isDark ? '#fff' : 'inherit' }}>
                    <img src="/img/sushmalogo.png" width="50" className="me-2" alt="Logo" /> Sushma Thapa
                </Link>
                <button
                    className="navbar-toggler position-relative me-3"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><Link className={`nav-link ${isActive('/')}`} href="/">Home</Link></li>
                        <li className="nav-item"><Link className={`nav-link ${isActive('/about')}`} href="/about">About</Link></li>
                        <li className="nav-item"><Link className={`nav-link ${isActive('/projects')}`} href="/projects">Projects</Link></li>
                        <li className="nav-item"><Link className={`nav-link ${isActive('/gallery')}`} href="/gallery">Gallery</Link></li>
                        <li className="nav-item"><Link className={`nav-link ${isActive('/contact')}`} href="/contact">Contact</Link></li>

                        <li className="nav-item">
                            <button
                                id="darkModeBtn"
                                className="nav-link bg-transparent border-0"
                                onClick={toggleDarkMode}
                            >
                                {isDark ? 'Light Mode' : 'Dark Mode'}
                            </button>
                        </li>
                    </ul>
                </div>
                <Stars className="stars" />
            </div>
        </nav>
    );
}
