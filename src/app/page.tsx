'use client';

import React, { useEffect, useRef, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import Typed from 'typed.js';
import Link from 'next/link';
import axios from 'axios';

export default function Home() {
  const el = useRef(null);
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/public/home-data')
      .then(res => {
        setInfo(res.data.info);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!info) return;

    const typed = new Typed(el.current, {
      strings: info.typed_strings || ["Laravel Developer", "Frontend Designer", "Tech Enthusiast"],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, [info]);

  if (loading) return <MainLayout title="Home"><div className="text-center py-5">Loading...</div></MainLayout>;
  if (!info) return <MainLayout title="Home"><div className="text-center py-5">Error loading information.</div></MainLayout>;

  return (
    <MainLayout title="Home">
      <section className="hero-section position-relative overflow-hidden">

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-lg-6 text-lg-start text-center mb-5 mb-lg-0">
              <h4 className="text-accent fw-bold mb-3 ls-wide fade-in" style={{ animationDelay: '0.1s' }}>WELCOME TO MY WORLD</h4>
              <h1 className="fw-bold text-purple glow mb-3 fade-in" style={{ fontSize: '4rem', animationDelay: '0.3s' }}>
                {info.hero_title}
              </h1>
              <h2 className="mb-4 text-secondary fade-in" style={{ animationDelay: '0.5s' }}>
                <span className="text-purple">I am a </span>
                <span ref={el} className="fw-bold"></span>
              </h2>
              <div className="fade-in" style={{ animationDelay: '0.7s' }}>
                <Link href="/contact" className="btn btn-primary btn-lg shadow-sm me-3">Let's Talk</Link>
                <Link href="/projects" className="btn btn-outline-primary btn-lg">View Portfolio</Link>
              </div>
            </div>
            <div className="col-lg-6 text-center position-relative">
              <div className="hero-img-wrapper fade-in" style={{ animationDelay: '0.4s' }}>
                <img
                  src={info.profile_image || '/img/profile.jpg'}
                  alt="Sushma Thapa"
                  className="profile-img shadow-lg"
                />
                <div className="img-backdrop"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <span></span>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="section-title">Why Hire Me?</h2>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="glass-card p-4 h-100 shadow-lg fade-in">
              <h3 className="fw-bold mb-3">Education</h3>
              <p><strong>Bachelors in Information Management</strong><br />St. Xavier’s College — Present</p>
              <p><strong>Schooling till Grade 12</strong><br />St. Mary’s High School — 2009–2021</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass-card p-4 h-100 shadow-lg fade-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="fw-bold mb-3">Skills</h3>
              <ul className="mb-0">
                <li>Programming, Tools & Software</li>
                <li>Communication, Teamwork</li>
                <li>Languages: English, Nepali, Hindi</li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass-card p-4 h-100 shadow-lg fade-in" style={{ animationDelay: '0.4s' }}>
              <h3 className="fw-bold mb-3">Achievements</h3>
              <p>Scholarships, GPA honors, Volunteer work, Leadership roles</p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
