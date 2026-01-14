'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone, MessageSquare } from 'lucide-react';
import clsx from 'clsx';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState<any>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setStatus(null);

        try {
            const res = await axios.post('/api/public/contact-submit', formData);
            if (res.data.success) {
                setStatus({ type: 'success', message: 'Message sent successfully!' });
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus({ type: 'error', message: res.data.message || 'Something went wrong.' });
            }
        } catch (err: any) {
            console.error(err);
            setStatus({ type: 'error', message: err.response?.data?.error || 'Error sending message.' });
        } finally {
            setSending(false);
        }
    };

    return (
        <MainLayout title="Contact">
            <section className="relative min-h-screen py-24 px-6 overflow-hidden">
                <div className="container relative z-10 max-w-7xl mx-auto">

                    {/* Page Header */}
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold font-heading mb-6 text-black dark:text-white tracking-tight"
                        >
                            Let's <span className="text-purple-600 dark:text-purple-400">Talk</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-black dark:text-gray-400 text-lg max-w-2xl mx-auto"
                        >
                            Have a specific inquiry or just want to say hi? Fill out the form below or use any of the contact channels.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Left: Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass-card p-10 md:p-14 bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[3rem] shadow-2xl"
                        >
                            {status && (
                                <div className={clsx(
                                    "p-5 rounded-2xl mb-10 text-sm font-bold border animate-in fade-in slide-in-from-top-4",
                                    status.type === 'success' ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400" : "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400"
                                )}>
                                    {status.message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-black uppercase tracking-widest text-black dark:text-gray-400 ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-6 py-5 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all duration-300 text-black dark:text-white"
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-black uppercase tracking-widest text-black dark:text-gray-400 ml-1">Email Address</label>
                                        <input
                                            type="email"
                                            className="w-full px-6 py-5 rounded-2xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all duration-300 text-gray-900 dark:text-white"
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-black uppercase tracking-widest text-black dark:text-gray-400 ml-1">Your Message</label>
                                    <textarea
                                        className="w-full px-6 py-5 rounded-[2rem] bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all duration-300 text-black dark:text-white min-h-[220px] resize-none"
                                        required
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        placeholder=""
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="group relative w-full py-6 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-3xl font-black uppercase tracking-widest text-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 active:scale-[0.98]"
                                    disabled={sending}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {sending ? 'Processing...' : 'Send Inquiry'}
                                        {!sending && <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                    </span>
                                </button>
                            </form>
                        </motion.div>

                        {/* Right: Info & Map */}
                        <div className="space-y-12 h-full flex flex-col">
                            {/* Contact Details */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                            >
                                <div className="glass-card p-8 bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl flex items-center gap-5">
                                    <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-black dark:text-gray-400">Email Me</p>
                                        <p className="font-bold text-black dark:text-white">sushmat952@gmail.com</p>
                                    </div>
                                </div>
                                <div className="glass-card p-8 bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl flex items-center gap-5">
                                    <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-black dark:text-gray-400">Location</p>
                                        <p className="font-bold text-black dark:text-white">Godawari, Lalitpur</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Map Restored */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex-grow min-h-[400px] glass-card overflow-hidden bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[3rem] shadow-xl relative group"
                            >
                                <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/0 transition-colors pointer-events-none z-10" />
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56561.42851221147!2d85.35!3d27.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb170d4bde4d5d%3A0xc6657c9f8d5f35d!2sGodawari!5e0!3m2!1sen!2snp!4v1710345678901!5m2!1sen!2snp"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'grayscale(1) contrast(1.2) invert(0.9) opacity(0.8)' }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
