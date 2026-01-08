'use client';

import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from './ChatWidget';

interface MainLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function MainLayout({ children, title }: MainLayoutProps) {
    useEffect(() => {
        if (title) {
            document.title = `${title} - Sushma Thapa`;
        }
    }, [title]);

    return (
        <div className="main-layout">
            <Navbar />
            <main className="transition-fade">
                {children}
            </main>
            <Footer />
            <ChatWidget />
        </div>
    );
}
