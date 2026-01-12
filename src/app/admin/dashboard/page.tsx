'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Briefcase, MessageSquare, Plus, Settings } from 'lucide-react';
import clsx from 'clsx';

const Dashboard = () => {
    const [stats, setStats] = useState({
        galleryCount: 0,
        projectCount: 0,
        messageCount: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/admin/dashboard')
            .then(res => {
                setStats(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    if (loading) return (
        <div className="flex h-64 items-center justify-center">
            <div className="w-8 h-8 border-t-2 border-pink-500 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
        >
            {/* Welcome Section */}
            <motion.div variants={itemVariants} className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 to-rose-500 p-8 shadow-xl shadow-pink-300/40">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-sm">Welcome Back, Admin!</h2>
                    <p className="text-white/90 max-w-xl font-medium">Manage your portfolio, messages, and site content effortlessly from your pink command center.</p>
                </div>
                {/* Decorative Circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                <div className="absolute bottom-0 left-20 w-32 h-32 bg-yellow-300/30 rounded-full blur-xl pointer-events-none"></div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {
                        title: 'Gallery Images',
                        value: stats.galleryCount,
                        icon: ImageIcon,
                        color: 'text-pink-600',
                        bg: 'bg-pink-100',
                        border: 'border-pink-200',
                        link: '/admin/gallery'
                    },
                    {
                        title: 'Total Projects',
                        value: stats.projectCount,
                        icon: Briefcase,
                        color: 'text-rose-600',
                        bg: 'bg-rose-100',
                        border: 'border-rose-200',
                        link: '/admin/projects'
                    },
                    {
                        title: 'New Messages',
                        value: stats.messageCount,
                        icon: MessageSquare,
                        color: 'text-purple-600',
                        bg: 'bg-purple-100',
                        border: 'border-purple-200',
                        link: '/admin/messages'
                    }
                ].map((stat, i) => (
                    <motion.div key={i} variants={itemVariants} whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
                        <Link href={stat.link} className={clsx("block h-full p-6 rounded-2xl bg-white/70 backdrop-blur-md border shadow-sm transition-all hover:shadow-lg hover:bg-white hover:scale-[1.02]", stat.border)}>
                            <div className="flex items-center justify-between mb-4">
                                <div className={clsx("p-3 rounded-xl shadow-inner", stat.bg, stat.color)}>
                                    <stat.icon size={24} />
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total</span>
                            </div>
                            <h3 className="text-4xl font-bold text-slate-800 mb-1">{stat.value}</h3>
                            <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
                <h3 className="text-xl font-bold text-slate-800 mb-6 drop-shadow-sm">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <Link href="/admin/projects/create" className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-white/70 border border-pink-100 hover:bg-pink-50 hover:border-pink-300 transition-all duration-300 shadow-sm hover:shadow-pink-200/50">
                        <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-3 group-hover:bg-pink-200 transition-colors shadow-sm">
                            <Plus className="text-pink-600" />
                        </div>
                        <span className="font-bold text-slate-700">Add Project</span>
                    </Link>

                    <Link href="/admin/gallery/create" className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-white/70 border border-rose-100 hover:bg-rose-50 hover:border-rose-300 transition-all duration-300 shadow-sm hover:shadow-rose-200/50">
                        <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-3 group-hover:bg-rose-200 transition-colors shadow-sm">
                            <ImageIcon className="text-rose-600" />
                        </div>
                        <span className="font-bold text-slate-700">Upload Photo</span>
                    </Link>

                    <Link href="/admin/chatbot" className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-white/70 border border-purple-100 hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 shadow-sm hover:shadow-purple-200/50">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors shadow-sm">
                            <Settings className="text-purple-600" />
                        </div>
                        <span className="font-bold text-slate-700">Bot Settings</span>
                    </Link>

                    <Link href="/admin/home" className="group flex flex-col items-center justify-center p-6 rounded-2xl bg-white/70 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-sm hover:shadow-slate-200/50">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 group-hover:bg-slate-200 transition-colors shadow-sm">
                            <Settings className="text-slate-600" />
                        </div>
                        <span className="font-bold text-slate-700">Site Settings</span>
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Dashboard;
