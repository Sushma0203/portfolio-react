'use client';

import React, { useEffect, useState, useMemo } from 'react';
import MainLayout from '@/components/MainLayout';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ExternalLink, Github, Code2 } from 'lucide-react';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('All');

    useEffect(() => {
        axios.get('/api/public/projects-data')
            .then(res => {
                setProjects(res.data.projects);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    // Extract all unique technologies for filtering
    const filters = useMemo(() => {
        const techs = new Set<string>();
        techs.add('All');

        projects.forEach(p => {
            let stack: string[] = [];
            if (Array.isArray(p.tech_stack)) {
                stack = p.tech_stack;
            } else if (typeof p.tech_stack === 'string') {
                stack = p.tech_stack.split(',').map((s: string) => s.trim());
            }

            stack.forEach((t: string) => {
                if (t && typeof t === 'string') {
                    let normalized = t.trim();
                    if (normalized !== '' && normalized !== 'null') {
                        // Force common acronyms to uppercase
                        const upper = normalized.toUpperCase();
                        if (['CSS', 'HTML', 'JS', 'PHP', 'UI', 'UX', '.NET', 'CRUD'].includes(upper)) {
                            normalized = upper;
                        }

                        // Avoid duplicates with different casing
                        const existing = Array.from(techs).find(e => e.toLowerCase() === normalized.toLowerCase());
                        if (!existing) {
                            techs.add(normalized);
                        }
                    }
                }
            });
        });

        return Array.from(techs).sort((a, b) => {
            if (a === 'All') return -1;
            if (b === 'All') return 1;
            return a.localeCompare(b);
        });
    }, [projects]);

    const filteredProjects = useMemo(() => {
        const active = activeFilter.toLowerCase().trim();
        if (active === 'all') return projects;

        return projects.filter(p => {
            let stack: string[] = [];
            if (Array.isArray(p.tech_stack)) {
                stack = p.tech_stack;
            } else if (typeof p.tech_stack === 'string') {
                stack = p.tech_stack.split(',');
            }

            return stack.some(t =>
                typeof t === 'string' && t.trim().toLowerCase() === active
            );
        });
    }, [projects, activeFilter]);

    return (
        <MainLayout title="Projects">
            <section className="container mx-auto px-6 py-24 min-h-screen">
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h2 className="text-5xl md:text-7xl font-bold font-heading mb-4 text-black dark:text-white tracking-tight">
                            Selected <span className="text-purple-600 dark:text-purple-400">Works</span>
                        </h2>
                        <p className="text-black dark:text-gray-400 text-lg max-w-xl">
                            A collection of specialized tools and creative experiments built with modern technologies.
                        </p>
                    </motion.div>

                    {/* Advanced Filter UI */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-wrap items-center justify-center md:justify-end gap-3 w-full"
                    >
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${activeFilter === filter
                                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                                    : "bg-gray-100 dark:bg-white/5 text-black dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </motion.div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
                        <p className="text-black dark:text-gray-500 font-medium italic">Curating projects...</p>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, i) => (
                                <motion.div
                                    key={project.id || i}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    className="group relative h-full"
                                >
                                    <div className="glass-card h-full flex flex-col overflow-hidden bg-white/40 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 rounded-[2.5rem] transition-all hover:bg-white dark:hover:bg-white/[0.08] hover:shadow-[0_20px_50px_rgba(124,58,237,0.15)] hover:-translate-y-2 group/card">
                                        <div className="relative aspect-video overflow-hidden">
                                            <img
                                                src={project?.image_path ? (project.image_path.startsWith('/') ? project.image_path : '/' + project.image_path) : "/img/placeholder.jpg"}
                                                alt={project?.title || "Project"}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-500 flex items-center justify-center gap-6">
                                                <motion.a
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    href="#"
                                                    className="p-4 bg-white/20 backdrop-blur-xl rounded-2xl text-white hover:bg-white hover:text-gray-900 transition-all shadow-xl"
                                                >
                                                    <ExternalLink size={24} />
                                                </motion.a>
                                                <motion.a
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    href="#"
                                                    className="p-4 bg-white/20 backdrop-blur-xl rounded-2xl text-white hover:bg-white hover:text-gray-900 transition-all shadow-xl"
                                                >
                                                    <Github size={24} />
                                                </motion.a>
                                            </div>
                                        </div>

                                        <div className="p-10 flex flex-col flex-grow">
                                            <div className="flex items-center gap-3 mb-5">
                                                <div className="p-2.5 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400">
                                                    <Code2 size={20} />
                                                </div>
                                                <h4 className="text-2xl font-bold text-black dark:text-white tracking-tight">{project.title}</h4>
                                            </div>

                                            <p className="text-black dark:text-gray-400 mb-10 line-clamp-3 text-sm leading-relaxed font-medium">
                                                {project.description}
                                            </p>

                                            <div className="mt-auto pt-6 border-t border-black/5 dark:border-white/5 flex flex-wrap gap-2.5">
                                                {Array.isArray(project.tech_stack) && project.tech_stack.map((tech: string, j: number) => (
                                                    <span
                                                        key={j}
                                                        className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest bg-gray-100 dark:bg-white/5 text-black dark:text-gray-300 rounded-full border border-black/5 dark:border-white/10"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </section>
        </MainLayout>
    );
}
