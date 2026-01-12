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
            className="h-full bg-white border-r border-slate-200 flex flex-col transition-all duration-300 relative shadow-sm"
        >
            {/* Toggle Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-8 bg-indigo-600 rounded-full p-1 text-white shadow-lg hover:bg-indigo-700 transition-all z-50 ring-4 ring-white"
            >
                {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>

            {/* Brand */}
            <div className="p-6 flex items-center justify-center border-b border-slate-100">
                {collapsed ? (
                    <span className="text-2xl font-bold text-indigo-600">S.</span>
                ) : (
                    <div className="text-center">
                        <h4 className="text-xl font-bold text-slate-900 tracking-wide">Sushma<span className="text-indigo-600">.Admin</span></h4>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-bold">Workspace</p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                {links.map((link) => {
                    const active = isActive(link.path);
                    return (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group relative",
                                active ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <link.icon size={18} className={clsx("transition-colors", active ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600")} />
                            {!collapsed && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-sm whitespace-nowrap"
                                >
                                    {link.name}
                                </motion.span>
                            )}
                            {active && (
                                <motion.div layoutId="active-pill" className="absolute left-0 w-1 h-6 bg-indigo-600 rounded-r-full" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-slate-100 space-y-1">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                    <LogOut size={18} />
                    {!collapsed && <span className="text-sm font-medium">Logout</span>}
                </button>
                <Link
                    href="/"
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                >
                    <ArrowLeft size={18} />
                    {!collapsed && <span className="text-sm font-medium">View Site</span>}
                </Link>
            </div>
        </motion.div>
    );
};

export default Sidebar;
