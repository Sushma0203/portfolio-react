import React from 'react';
import Stars from './Stars';

export default function Footer() {
    return (
        <footer className="position-relative">
            <div className="container position-relative" style={{ zIndex: 10 }}>
                <div className="mb-4">
                    <a href="https://www.linkedin.com/in/sushma-thapa-015574275" target="_blank" rel="noreferrer" className="mx-3 text-white"><i className="bi bi-linkedin fs-3"></i></a>
                    <a href="https://github.com/Sushma0203" target="_blank" rel="noreferrer" className="mx-3 text-white"><i className="bi bi-github fs-3"></i></a>
                    <a href="mailto:sushmat952@email.com" className="mx-3 text-white"><i className="bi bi-envelope-fill fs-3"></i></a>
                </div>
                <p className="mb-0 opacity-75">&copy; {new Date().getFullYear()} Sushma Thapa | All Rights Reserved</p>
                <p className="small mt-2 text-muted">Designed with ✨ by Antigravity</p>
            </div>

            <Stars className="footer-stars" count={60} />
        </footer>
    );
}
