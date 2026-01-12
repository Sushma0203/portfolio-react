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
    <div className="h-screen w-full flex items-center justify-center bg-black text-white">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500"></div>
    </div>
  );

  return (
    <MainLayout title="Home">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="absolute inset-0 bg-[url('/img/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>

        <div className="container relative z-10 px-6">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-green-400"></span>
              <span className="text-sm font-medium text-gray-300">Available for work</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading w-full max-w-5xl mx-auto tracking-tight mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/50">
                {info?.hero_title || "Crafting Digital Reality"}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              I am a <span className="text-purple-400 font-semibold">{info?.typed_strings?.[0] || "Developer"}</span> transforming ideas into exceptional digital experiences. Specialized in Laravel, React, and Modern UI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <Link href="/projects" className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white text-black px-8 font-medium transition-all duration-300 hover:bg-gray-200 hover:scale-105">
                <span className="mr-2">View Work</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-transparent px-8 font-medium text-white transition-all duration-300 hover:bg-white/10 hover:scale-105">
                Contact Me
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bento Grid / Why Hire Me */}
      <section className="py-24 relative overflow-hidden">
        <div className="container px-6 mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 font-heading"
          >
            Why <span className="text-purple-400">Collaboration</span> Matters
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Tech Stack Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 glass-panel p-8 rounded-3xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                <Code size={120} />
              </div>
              <h3 className="text-2xl font-bold mb-4 z-10 relative">Technical Mastery</h3>
              <p className="text-gray-400 z-10 relative max-w-md">
                Proficient in a versatile stack including React, Next.js, Laravel, and Tailwind. I build scalable, high-performance applications with clean code.
              </p>
            </motion.div>

            {/* Communication Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-8 rounded-3xl group hover:bg-white/5 transition-colors"
            >
              <div className="bg-purple-500/20 p-3 rounded-xl w-fit mb-6 text-purple-400 group-hover:scale-110 transition-transform">
                <Sparkles size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Creative Vision</h3>
              <p className="text-gray-400 text-sm">
                Blending aesthetics with functionality to create memorable user experiences.
              </p>
            </motion.div>

            {/* Achievements Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-panel p-8 rounded-3xl group hover:bg-white/5 transition-colors"
            >
              <div className="bg-cyan-500/20 p-3 rounded-xl w-fit mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
                <Terminal size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Problem Solver</h3>
              <p className="text-gray-400 text-sm">
                Proven track record of complex problem solving, scholarships, and academic excellence.
              </p>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 glass-panel p-8 rounded-3xl relative overflow-hidden flex items-center justify-between group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <h3 className="text-2xl font-bold mb-2">Ready to start?</h3>
                <p className="text-gray-400">Let's build something amazing together.</p>
              </div>
              <Link href="/contact" className="bg-white text-black p-4 rounded-full group-hover:scale-110 transition-transform z-10">
                <ArrowRight />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
