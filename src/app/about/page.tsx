'use client';

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import axios from 'axios';

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
            <section className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="glass-card p-5 shadow-lg fade-in">
                            <h2 className="fw-bold text-purple mb-4">About Me</h2>
                            <p className="lead mb-4">{info.career_objective}</p>

                            <div className="row g-4 mt-2">
                                <div className="col-md-6">
                                    <h4 className="fw-bold mb-3"><i className="bi bi-code-slash me-2"></i>Technical Skills</h4>
                                    <ul className="list-group list-group-flush bg-transparent">
                                        {info.technical_skills?.map((skill: string, i: number) => (
                                            <li key={i} className="list-group-item bg-transparent border-0 ps-0 text-secondary">{skill}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <h4 className="fw-bold mb-3"><i className="bi bi-people-fill me-2"></i>Soft Skills</h4>
                                    <ul className="list-group list-group-flush bg-transparent">
                                        {info.soft_skills?.map((skill: string, i: number) => (
                                            <li key={i} className="list-group-item bg-transparent border-0 ps-0 text-secondary">{skill}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-12 mt-4">
                                    <h4 className="fw-bold mb-3"><i className="bi bi-trophy-fill me-2"></i>Achievements</h4>
                                    <ul className="list-group list-group-flush bg-transparent">
                                        {info.achievements?.map((achievement: string, i: number) => (
                                            <li key={i} className="list-group-item bg-transparent border-0 ps-0 text-secondary">{achievement}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
