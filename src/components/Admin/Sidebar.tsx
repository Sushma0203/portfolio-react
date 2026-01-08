'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';

const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (path: string) => {
        return pathname === path ? 'active' : '';
    };

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout');
            router.push('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <div id="sidebar">
            <div className="sidebar-brand text-center">
                <h4 className="fw-bold mb-0 text-white">Sushma<span className="text-gold">Admin</span></h4>
                <small className="text-white-50">Portfolio Manager</small>
            </div>
            <nav className="nav flex-column mt-3">
                <Link href="/admin/dashboard" className={`nav-link ${isActive('/admin/dashboard')}`}>
                    <i className="bi bi-speedometer2"></i> Dashboard
                </Link>
                <Link href="/admin/home" className={`nav-link ${isActive('/admin/home')}`}>
                    <i className="bi bi-house-door"></i> Home Page
                </Link>
                <Link href="/admin/about" className={`nav-link ${isActive('/admin/about')}`}>
                    <i className="bi bi-person"></i> About Page
                </Link>
                <Link href="/admin/gallery" className={`nav-link ${isActive('/admin/gallery')}`}>
                    <i className="bi bi-images"></i> Gallery
                </Link>
                <Link href="/admin/projects" className={`nav-link ${isActive('/admin/projects')}`}>
                    <i className="bi bi-briefcase"></i> Projects
                </Link>
                <Link href="/admin/messages" className={`nav-link ${isActive('/admin/messages')}`}>
                    <i className="bi bi-chat-dots"></i> Messages
                </Link>
                <Link href="/admin/chatbot" className={`nav-link ${isActive('/admin/chatbot')}`}>
                    <i className="bi bi-robot"></i> Chat Bot
                </Link>
                <div className="mt-auto">
                    <button onClick={handleLogout} className="nav-link text-white-50 bg-transparent border-0 text-start w-100">
                        <i className="bi bi-box-arrow-left"></i> Logout
                    </button>
                    <Link href="/" className="nav-link text-white-50">
                        <i className="bi bi-arrow-left"></i> Back to Site
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
