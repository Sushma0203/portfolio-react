'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import clsx from 'clsx';
import Stars from './Stars';

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        // Initialize dark mode from local storage or default to true
        const savedMode = localStorage.getItem('theme');
        const initialDark = savedMode ? savedMode === 'dark' : true;
        // Defer state update to avoid synchronous setState in effect warning
        setTimeout(() => setIsDark(initialDark), 0);
        document.documentElement.classList.toggle('dark', initialDark);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const newMode = !isDark;
        setIsDark(newMode);
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', newMode);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Projects', path: '/projects' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={clsx(
                'fixed top-0 w-full z-50 transition-all duration-300',
                scrolled ? 'py-4' : 'py-6'
            )}
        >
            <div className={clsx(
                "container mx-auto px-6 rounded-2xl transition-all duration-300 relative overflow-hidden",
                scrolled ? "bg-black/95 dark:bg-black/80 backdrop-blur-xl border border-white/10 dark:border-white/10 shadow-xl py-3" : "bg-black/80 backdrop-blur-xl border border-white/10"
            )}>
                <Stars className="absolute inset-0 w-full h-full pointer-events-none opacity-20" count={20} />
                <div className="flex items-center justify-between relative z-10">
                    <Link href="/" className="relative z-50 group">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold font-heading bg-gradient-to-r from-white to-white/80 dark:from-white dark:to-white/60 bg-clip-text text-transparent group-hover:scale-105 transition-all duration-300">
                                Sushma.
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={clsx(
                                    "relative text-sm font-medium transition-colors hover:text-purple-400 dark:hover:text-purple-400",
                                    pathname === link.path ? "text-purple-400 dark:text-purple-400" : "text-white dark:text-gray-300"
                                )}
                            >
                                {pathname === link.path && (
                                    <motion.span
                                        layoutId="underline"
                                        className="absolute left-0 top-full block h-[1px] w-full bg-purple-400 dark:bg-purple-400 mt-1"
                                    />
                                )}
                                {link.name}
                            </Link>
                        ))}

                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-white/10 transition-colors text-white dark:text-gray-200"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-700 dark:text-gray-200"
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            className="z-50 text-white dark:text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-40 bg-white/95 dark:bg-black/95 backdrop-blur-xl md:hidden flex items-center justify-center text-center"
                    >
                        <div className="flex flex-col items-center gap-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-2xl font-bold text-gray-800 dark:text-white hover:text-purple-500 dark:hover:text-purple-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
