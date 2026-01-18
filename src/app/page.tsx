'use client';

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import Link from 'next/link';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Code2, Award, ArrowRight, Sparkles, Terminal } from 'lucide-react';

// Advanced Typing Component
const TypedText = ({ strings }: { strings: string[] }) => {
  const [displayText, setDisplayText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!strings || strings.length === 0) return;

    const currentString = strings[stringIndex];
    let timer: NodeJS.Timeout;

    if (isTyping) {
      if (charIndex < currentString.length) {
        timer = setTimeout(() => {
          setDisplayText(prev => prev + currentString[charIndex]);
          setCharIndex(prev => prev + 1);
        }, 100);
      } else {
        timer = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
          setCharIndex(prev => prev - 1);
        }, 50);
      } else {
        setTimeout(() => {
          setIsTyping(true);
          setStringIndex(prev => (prev + 1) % strings.length);
        }, 0);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isTyping, stringIndex, strings]);

  return <span className="text-black dark:text-purple-400">{displayText}<span className="inline-block w-[2px] h-[1em] bg-black dark:bg-purple-500 animate-pulse ml-1 align-middle"></span></span>;
};

export default function Home() {
  const [info, setInfo] = useState<any>(null);
  const [aboutInfo, setAboutInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [homeRes, aboutRes] = await Promise.all([
          axios.get('/api/public/home-data'),
          axios.get('/api/public/about-data')
        ]);
        setInfo(homeRes.data.info);
        setAboutInfo(aboutRes.data.info);
      } catch (e) {
        console.error("Error fetching data:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500"></div>
    </div>
  );

  return (
    <MainLayout title="Home">
      {/* HERO SECTION - Advanced Layout */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-12 text-center overflow-hidden">
        {/* Background handled by global ParticleBackground */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-5xl"
        >
          {/* Main Identity Branding */}
          <div className="flex flex-col items-center mb-12">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden p-1.5 bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-500 shadow-2xl mb-10"
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-background">
                <img
                  src={info?.profile_image ? (info.profile_image.startsWith('/') ? info.profile_image : `/${info.profile_image}`) : "/img/profile.jpg"}
                  alt="Sushma Thapa"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <span className="inline-block py-1.5 px-4 rounded-full bg-purple-900/90 dark:bg-purple-500/20 text-white dark:text-purple-300 text-[10px] font-black tracking-[0.3em] uppercase mb-8 border border-purple-700 dark:border-purple-500/20">
              Personal Portfolio
            </span>

            <h1 className="text-6xl md:text-9xl font-bold font-heading mb-6 tracking-tight leading-[0.85] text-black dark:text-white">
              {info?.hero_title || "Sushma Thapa"}
            </h1>

            <div className="text-2xl md:text-4xl font-light text-black dark:text-gray-400 tracking-tight min-h-[1.5em] mb-12">
              <TypedText strings={info?.typed_strings || ["Laravel Developer", "Frontend Designer", "Tech Enthusiast"]} />
            </div>

            <Link
              href="/projects"
              className="group relative px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold transition-all hover:pr-14 active:scale-95 shadow-xl"
            >
              Explore My Work
              <ArrowRight size={18} className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* CORE INFO - Advanced Responsive Grid */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">

          {/* Education Card - Grouped by Level */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group glass-card p-10 h-full relative overflow-hidden bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] transition-all hover:bg-white/60 dark:hover:bg-white/10"
          >
            <div className="absolute top-8 right-8 text-black/5 dark:text-white/5 group-hover:text-purple-500/10 transition-colors">
              <GraduationCap size={80} />
            </div>
            <h3 className="text-2xl font-bold mb-10 text-black dark:text-white flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/10 dark:bg-purple-500/20">
                <GraduationCap className="text-purple-600 dark:text-purple-400" size={24} />
              </div>
              Education
            </h3>
            <div className="space-y-10 pl-2">
              {aboutInfo?.education_details?.map((edu: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-8 border-l-2 border-purple-500/20 hover:border-purple-500/50 transition-colors"
                >
                  <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>

                  <span className="text-[10px] uppercase tracking-[0.4em] text-purple-400 font-black mb-1 block">
                    {edu?.year || 'Duration'}
                  </span>
                  <h4 className="text-xl font-bold text-black dark:text-white mb-1">
                    {edu?.degree}
                  </h4>
                  <p className="text-black dark:text-gray-400 text-sm font-medium">
                    {edu?.school}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Card - Advanced Tag Cloud */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group glass-card p-10 h-full relative overflow-hidden bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] transition-all hover:bg-white/60 dark:hover:bg-white/10"
          >
            <div className="absolute top-8 right-8 text-black/5 dark:text-white/5 group-hover:text-indigo-500/10 transition-colors">
              <Code2 size={80} />
            </div>
            <h3 className="text-2xl font-bold mb-10 text-black dark:text-white flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20">
                <Code2 className="text-indigo-600 dark:text-indigo-400" size={24} />
              </div>
              Capabilities
            </h3>
            <div className="space-y-8">
              {aboutInfo?.technical_skills?.length > 0 && (
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-indigo-500 font-black mb-4">Technical Expertise</h4>
                  <div className="flex flex-wrap gap-2.5">
                    {aboutInfo.technical_skills.map((skill: string, i: number) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.05, translateY: -2 }}
                        className="px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-gray-300 text-xs font-semibold shadow-sm hover:border-indigo-500/50 transition-all cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {aboutInfo?.soft_skills?.length > 0 && (
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] text-purple-500 font-black mb-4">Soft Skills</h4>
                  <div className="flex flex-wrap gap-2.5">
                    {aboutInfo.soft_skills.map((skill: string, i: number) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.05, translateY: -2 }}
                        className="px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-gray-300 text-xs font-semibold shadow-sm hover:border-purple-500/50 transition-all cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Achievements Card - High Impact List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group glass-card p-10 h-full relative overflow-hidden bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[2.5rem] transition-all hover:bg-white/60 dark:hover:bg-white/10"
          >
            <div className="absolute top-8 right-8 text-black/5 dark:text-white/5 group-hover:text-amber-500/10 transition-colors">
              <Award size={80} />
            </div>
            <h3 className="text-2xl font-bold mb-10 text-black dark:text-white flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 dark:bg-amber-500/20">
                <Award className="text-amber-600 dark:text-amber-400" size={24} />
              </div>
              Milestones
            </h3>
            <div className="space-y-6">
              {aboutInfo?.achievements?.map((item: string, i: number) => (
                <div key={i} className="flex gap-4 items-start group/item">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-amber-500 shrink-0 group-hover/item:scale-150 transition-transform"></div>
                  <p className="text-black dark:text-gray-400 font-medium leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION - Mobile Friendly */}
      <section className="container mx-auto px-6 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-tr from-black to-gray-900 dark:from-white/[0.03] dark:to-indigo-500/[0.05] p-16 md:p-32 rounded-[4rem] border border-white/10 shadow-3xl overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-indigo-500/10 to-transparent pointer-events-none"></div>


          <div className="relative z-10 flex flex-col items-center gap-12">
            <h2 className="text-5xl md:text-8xl font-black text-white mb-2 tracking-tight leading-[0.9]">
              Ready to create <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">
                extraordinary?
              </span>
            </h2>
            <Link
              href="/contact"
              className="group relative px-16 py-6 bg-white text-gray-950 rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10"
            >
              <span className="relative z-10">GET IN TOUCH</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-200 to-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </div>
        </motion.div>
      </section>
    </MainLayout>
  );
}
