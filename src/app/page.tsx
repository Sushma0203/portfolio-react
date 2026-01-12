'use client';

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import Link from 'next/link';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Terminal, Sparkles, Send } from 'lucide-react';

export default function Home() {
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetch or actual fetch if API works
    const fetchData = async () => {
      try {
        // Fallback data if API fails or while testing
        const fallbackData = {
          hero_title: "Building Digital Experiences",
          typed_strings: ["Full Stack Developer", "UI/UX Designer", "Creative Thinker"],
          profile_image: "/img/profile.jpg"
        };

        try {
          const res = await axios.get('/api/public/home-data');
          setInfo(res.data.info || fallbackData);
        } catch (e) {
          console.log("Using fallback data");
          setInfo(fallbackData);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-background text-foreground transition-colors duration-500">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500"></div>
    </div>
  );

  return (
    <MainLayout title="Home">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Modern Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[url('/img/grid.svg')] bg-[length:40px_40px] opacity-[0.03] dark:opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
        </div>

        <div className="container relative z-10 px-6 max-w-7xl">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-16"
            >
              <span className="inline-block py-2 px-5 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 text-[10px] font-black tracking-[0.2em] uppercase mb-10 border border-purple-500/20 shadow-sm">
                Next-Gen Software Engineering
              </span>
              <h1 className="text-7xl md:text-9xl font-bold font-heading mb-10 tracking-tight leading-[0.85] text-gray-900 dark:text-white">
                <span className="block mb-4">Elevating</span>
                <span className="block italic font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-500 dark:from-purple-400 dark:via-indigo-300 dark:to-cyan-300">Digital Status.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-light tracking-tight">
                I am <span className="font-semibold text-gray-900 dark:text-white">Sushma Thapa</span>.
                A Senior Full-Stack Engineer dedicated to crafting high-performance,
                premium software solutions with a focus on <span className="text-purple-600 dark:text-purple-400 font-medium">uncompromising quality</span>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8"
            >
              <Link href="/projects" className="group relative px-12 py-6 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)] active:scale-95">
                <span className="relative z-10 flex items-center gap-3">
                  Examine My Work <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-10 opacity- dark:group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              </Link>
              <Link href="/contact" className="px-12 py-6 rounded-2xl border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white font-bold hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-500 active:scale-95">
                Start a Project
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bento Grid / Why Hire Me */}
      <section className="py-32 relative overflow-hidden">
        <div className="container px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="section-title mb-6">Engineering Philosophy</h2>
            <p className="lead max-w-2xl mx-auto text-secondary">
              Merging technical architecture with high-end aesthetic precision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Architectural Excellence Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 glass-card p-10 relative overflow-hidden group border border-black/5 dark:border-white/5"
            >
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] dark:opacity-[0.07] group-hover:opacity-10 transition-opacity duration-500 scale-150">
                <Code size={180} />
              </div>
              <h3 className="text-3xl font-bold mb-6 z-10 relative text-gray-900 dark:text-white">Architectural Excellence</h3>
              <p className="text-lg text-gray-700 dark:text-gray-400 z-10 relative max-w-xl leading-relaxed">
                Building robust, scalable infrastructures using the latest industry standards.
                Focusing on performance, security, and maintainable codebases for sustainable growth.
              </p>
            </motion.div>

            {/* Aesthetic Precision Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-10 group hover:shadow-xl transition-all duration-500 border border-black/5 dark:border-white/5"
            >
              <div className="bg-purple-500/10 p-4 rounded-2xl w-fit mb-8 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-500">
                <Sparkles size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Aesthetic Precision</h3>
              <p className="text-gray-700 dark:text-gray-400 leading-relaxed font-light">
                Crafting interfaces that are not just visually stunning, but intuitively functional and emotionally resonant.
              </p>
            </motion.div>

            {/* Strategic Solving Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-10 group hover:shadow-xl transition-all duration-500 border border-black/5 dark:border-white/5"
            >
              <div className="bg-cyan-500/10 p-4 rounded-2xl w-fit mb-8 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-500">
                <Terminal size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Strategic Solving</h3>
              <p className="text-gray-700 dark:text-gray-400 leading-relaxed font-light">
                Approaching complex business challenges with analytical rigor and innovative engineering solutions.
              </p>
            </motion.div>

            {/* Partnership CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 glass-card p-10 relative overflow-hidden flex items-center justify-between group cursor-pointer border border-black/5 dark:border-white/5"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div>
                <h3 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">Ready for Transformation?</h3>
                <p className="text-lg text-gray-700 dark:text-gray-400 font-light">Let's discuss how we can build your next masterpiece.</p>
              </div>
              <Link href="/contact" className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-5 rounded-2xl group-hover:scale-110 transition-transform duration-500 z-10 shadow-lg">
                <ArrowRight size={24} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
