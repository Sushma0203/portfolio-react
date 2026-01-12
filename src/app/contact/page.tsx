'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
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
            <section className="relative min-h-screen py-24 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-500/5 blur-[120px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] rounded-full" />
                </div>

                <div className="container relative z-10 px-6 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-gray-900 dark:text-white">Let's Connect</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">Have a project in mind? I'd love to hear from you.</p>
                    </motion.div>

                    <div className="flex justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="w-full max-w-xl glass-card p-8 md:p-12 shadow-2xl shadow-purple-500/5"
                        >
                            {status && (
                                <div className={clsx(
                                    "p-4 rounded-2xl mb-8 text-sm font-medium border animate-in fade-in slide-in-from-top-4",
                                    status.type === 'success' ? "bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400" : "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400"
                                )}>
                                    {status.message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Your Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all duration-300 text-gray-900 dark:text-white"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all duration-300 text-gray-900 dark:text-white"
                                        required
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Message</label>
                                    <textarea
                                        className="w-full px-6 py-4 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all duration-300 text-gray-900 dark:text-white min-h-[150px] resize-none"
                                        required
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Tell me about your project..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="group relative w-full py-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 active:scale-[0.98]"
                                    disabled={sending}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {sending ? 'Sending...' : 'Send Message'}
                                        {!sending && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
