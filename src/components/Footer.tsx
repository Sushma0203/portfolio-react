'use client';

import React from 'react';
import Stars from './Stars';
import { Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative py-12 border-t border-black/5 dark:border-white/10 bg-black/5 dark:bg-black/40 backdrop-blur-lg">
            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="flex justify-center items-center gap-8 mb-8">
                    <a
                        href="https://www.linkedin.com/in/sushma-thapa-015574275"
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 rounded-full bg-gray-900/5 dark:bg-white/5 hover:bg-gray-900/10 dark:hover:bg-white/10 text-gray-700 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white transition-all duration-300 hover:scale-110"
                    >
                        <Linkedin size={24} />
                    </a>
                    <a
                        href="https://github.com/Sushma0203"
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 rounded-full bg-gray-900/5 dark:bg-white/5 hover:bg-gray-900/10 dark:hover:bg-white/10 text-gray-700 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white transition-all duration-300 hover:scale-110"
                    >
                        <Github size={24} />
                    </a>
                    <a
                        href="mailto:sushmat952@email.com"
                        className="p-3 rounded-full bg-gray-900/5 dark:bg-white/5 hover:bg-gray-900/10 dark:hover:bg-white/10 text-gray-700 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white transition-all duration-300 hover:scale-110"
                    >
                        <Mail size={24} />
                    </a>
                </div>

                <p className="text-gray-900 dark:text-gray-400 mb-2 font-medium">
                    &copy; {new Date().getFullYear()} Sushma Thapa. All Rights Reserved.
                </p>
                
            </div>

            <Stars className="absolute inset-0 w-full h-full pointer-events-none opacity-30" count={40} />
        </footer>
    );
}
