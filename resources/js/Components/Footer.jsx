import React from 'react';
import Stars from './Stars';

export default function Footer() {
    return (
        <footer className="position-relative">
            <p style={{ position: 'relative', zIndex: 10 }}>&copy; 2025 Sushma Thapa | All Rights Reserved</p>
            <div className="mt-2" style={{ position: 'relative', zIndex: 10 }}>
                <a href="https://www.linkedin.com/in/sushma-thapa-015574275" target="_blank" rel="noreferrer"><i className="bi bi-linkedin"></i></a>
                <a href="https://github.com/Sushma0203" target="_blank" rel="noreferrer"><i className="bi bi-github"></i></a>
                <a href="mailto:sushmat952@email.com"><i className="bi bi-envelope-fill"></i></a>
            </div>

            {/* Glitter stars overlay */}
            <Stars className="footer-stars" count={80} />
        </footer>
    );
}
