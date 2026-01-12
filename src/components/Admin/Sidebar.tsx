'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Home,
    User,
    Image as ImageIcon,
    Briefcase,
    MessageSquare,
    Bot,
    LogOut,
    ArrowLeft,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);

    const isActive = (path: string) => pathname === path;

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout');
            router.push('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    const links = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Home Page', path: '/admin/home', icon: Home },
        { name: 'About Page', path: '/admin/about', icon: User },
        { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
        { name: 'Projects', path: '/admin/projects', icon: Briefcase },
        { name: 'Messages', path: '/admin/messages', icon: MessageSquare },
        { name: 'Chat Bot', path: '/admin/chatbot', icon: Bot },
    ];

    return (
        <motion.div
            animate={{ width: collapsed ? 80 : 280 }}
            className="h-full bg-pink-50/60 backdrop-blur-xl border-r border-pink-200 flex flex-col transition-all duration-300 relative shadow-xl shadow-pink-500/5"
        >
            {/* Toggle Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full p-1 text-white shadow-lg hover:shadow-rose-300/50 transition-all z-50 ring-4 ring-pink-50"
            >
                {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            {/* Brand */}
            <div className="p-6 flex items-center justify-center border-b border-pink-200/50">
                {collapsed ? (
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-rose-500">S.</span>
                ) : (
                    <div className="text-center">
                        <h4 className="text-xl font-bold text-slate-800 tracking-wide">Sushma<span className="text-rose-500">.Admin</span></h4>
                        <p className="text-xs text-pink-500 uppercase tracking-widest mt-1 font-semibold">Manager</p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
                {links.map((link) => {
                    const active = isActive(link.path);
                    return (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                active ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-300/50" : "text-slate-600 hover:bg-white/50 hover:text-pink-600 hover:shadow-sm"
                            )}
                        >
                            <link.icon size={20} className={clsx("flex-shrink-0 transition-colors", active ? "text-white" : "text-slate-500 group-hover:text-rose-500")} />
                            {!collapsed && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="font-medium whitespace-nowrap"
                                >
                                    {link.name}
                                </motion.span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-pink-200/50 space-y-2">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                    <LogOut size={20} />
                    {!collapsed && <span className="font-bold">Logout</span>}
                </button>
                <Link
                    href="/"
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-white/40 hover:text-pink-600 transition-colors"
                >
                    <ArrowLeft size={20} />
                    {!collapsed && <span className="font-medium">Back to Site</span>}
                </Link>
            </div>
        </motion.div>
    );
};

export default Sidebar;
