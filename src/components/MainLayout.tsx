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
        <div className="flex flex-col min-h-screen bg-transparent text-foreground font-body">
            <Navbar />
            <div className="flex-grow pt-24">
                {children}
            </div>
            <Footer />
            <ChatWidget />
        </div>
    );
}
