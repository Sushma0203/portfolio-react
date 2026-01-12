'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post('/api/auth/login', { username, password });
            if (res.data.success) {
                router.push('/admin/dashboard');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 relative overflow-hidden font-body text-slate-800">
            {/* Vibrant Pink Blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-300/40 rounded-full blur-[100px] pointer-events-none mix-blend-multiply animate-blob"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-300/40 rounded-full blur-[100px] pointer-events-none mix-blend-multiply animate-blob animation-delay-2000"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md p-8"
            >
                <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-2xl shadow-pink-500/10 p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-200 to-rose-200 mb-4 shadow-inner ring-4 ring-white/50">
                            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-600 to-rose-600">S.</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">Admin Portal</h3>
                        <p className="text-slate-500 text-sm mt-1">Authorized Personnel Only</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-red-50 text-red-500 text-sm p-3 rounded-xl mb-6 text-center border border-red-100 font-medium"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-600 ml-1">Username</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-pink-500 transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-3 bg-white/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all placeholder:text-slate-400 text-slate-800 font-medium"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-600 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-rose-500 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    className="w-full pl-10 pr-4 py-3 bg-white/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300 focus:border-rose-400 transition-all placeholder:text-slate-400 text-slate-800 font-medium"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 rounded-xl text-white font-bold tracking-wide bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-300/40 active:scale-[0.98] transition-all duration-200"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                    Authenticating...
                                </span>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    <div className="text-center mt-8">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-pink-600 transition-colors font-medium">
                            <ArrowLeft size={14} />
                            Back to Website
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
