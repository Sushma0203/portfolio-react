import React, { useEffect, useRef, useState } from 'react';
import MainLayout from '../../Layouts/MainLayout';
import Typed from 'typed.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
    const el = useRef(null);
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/home-data')
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

    if (loading) return <MainLayout title="Home"><div>Loading...</div></MainLayout>;
    if (!info) return <MainLayout title="Home"><div>Error loading information.</div></MainLayout>;

    return (
        <MainLayout title="Home">
            {/* HERO SECTION */}
            <section className="hero-section py-5 text-center">
                <img
                    src={info.profile_image || '/img/profile.jpg'}
                    alt="Sushma Thapa"
                    className="profile-img mb-4 shadow-lg"
                    style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <h1 className="fw-bold text-purple glow mb-2" style={{ color: '#6f42c1' }}>{info.hero_title}</h1>
                <h3 className="mb-3 text-secondary">
                    <span ref={el}></span>
                </h3>
                <Link to="/contact" className="btn btn-primary btn-lg shadow-sm">Hire Me / Contact</Link>
            </section>

            {/* ABOUT / CARDS SECTION */}
            <section className="container py-5">
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="glass-card p-4 h-100 shadow-lg fade-in" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', borderRadius: '15px' }}>
                            <h3 className="fw-bold mb-3">Education</h3>
                            <p><strong>Bachelors in Information Management</strong><br />St. Xavier’s College — Present</p>
                            <p><strong>Schooling till Grade 12</strong><br />St. Mary’s High School — 2009–2021</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="glass-card p-4 h-100 shadow-lg fade-in" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', borderRadius: '15px' }}>
                            <h3 className="fw-bold mb-3">Skills</h3>
                            <ul className="mb-0">
                                <li>Programming, Tools & Software</li>
                                <li>Communication, Teamwork</li>
                                <li>Languages: English, Nepali, Hindi</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="glass-card p-4 h-100 shadow-lg fade-in" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', borderRadius: '15px' }}>
                            <h3 className="fw-bold mb-3">Achievements</h3>
                            <p>Scholarships, GPA honors, Volunteer work, Leadership roles</p>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
