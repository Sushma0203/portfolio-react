'use client';

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import axios from 'axios';
import { Code2, Users, Trophy } from 'lucide-react';

export default function About() {
    const [info, setInfo] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/public/about-data')
            .then(res => {
                setInfo(res.data.info);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <MainLayout title="About"><div className="text-center py-5">Loading...</div></MainLayout>;
    if (!info) return <MainLayout title="About"><div className="text-center py-5">Error loading information.</div></MainLayout>;

    return (
        <MainLayout title="About">
            <section className="container py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-5xl md:text-7xl font-bold font-heading mb-16 text-center text-black dark:text-white tracking-tight">
                        About <span className="text-purple-500">Me</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Career Objective Block */}
                        <div className="md:col-span-2 glass-card p-10 reveal active">
                            <h3 className="text-2xl font-bold mb-6 text-purple-400 flex items-center gap-3 font-heading">
                                <Users size={28} /> Career Vision
                            </h3>
                            <p className="text-lg md:text-xl text-black dark:text-gray-300 leading-relaxed font-medium">
                                {info.career_objective}
                            </p>
                        </div>

                        {/* Technical Skills Block */}
                        <div className="glass-card p-10 reveal active">
                            <h3 className="text-2xl font-bold mb-8 text-purple-400 flex items-center gap-3 font-heading">
                                <Code2 size={28} /> Technical Expertise
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {info.technical_skills?.map((skill: string, i: number) => (
                                    <span key={i} className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-black dark:text-gray-200 text-sm font-semibold">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Soft Skills Block */}
                        <div className="glass-card p-10 reveal active">
                            <h3 className="text-2xl font-bold mb-8 text-purple-400 flex items-center gap-3 font-heading">
                                <Users size={28} /> Soft Skills
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {info.soft_skills?.map((skill: string, i: number) => (
                                    <span key={i} className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-black dark:text-gray-200 text-sm font-semibold">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Achievements Block */}
                        <div className="md:col-span-2 glass-card p-10 reveal active">
                            <h3 className="text-2xl font-bold mb-8 text-purple-400 flex items-center gap-3 font-heading">
                                <Trophy size={28} /> Milestones & Achievements
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {info.achievements?.map((item: string, i: number) => (
                                    <div key={i} className="flex gap-4 items-start p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all">
                                        <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-500 shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                                        <p className="text-black dark:text-gray-300 font-medium leading-relaxed">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout >
    );
}
