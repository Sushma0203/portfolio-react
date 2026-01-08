import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import ChatWidget from '../Components/ChatWidget';
export default function MainLayout({ children, title }) {
    React.useEffect(() => {
        if (title) document.title = `${title} - Sushma Thapa`;
    }, [title]);

    return (
        <div className="main-layout">

            <Navbar />

            <main id="swup" className="transition-fade">
                {children}
            </main>

            <Footer />

            <ChatWidget />
        </div>
    );
}
