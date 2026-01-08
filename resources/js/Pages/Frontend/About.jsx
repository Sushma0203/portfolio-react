import React, { useEffect, useState } from 'react';
import MainLayout from '../../Layouts/MainLayout';
import axios from 'axios';

export default function About() {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/about-data')
            .then(res => {
                setInfo(res.data.info);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const styles = {
        profileCard: {
            borderRadius: '20px',
            background: 'rgba(200, 162, 255, 0.25)',
            backdropFilter: 'blur(15px)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
        },
        bioCard: {
            borderRadius: '20px',
            background: 'rgba(245, 240, 255, 0.25)',
            backdropFilter: 'blur(15px)',
        },
        socialIcon: {
            fontSize: '1.5rem',
            margin: '0 8px',
            color: '#5d3ea8',
            transition: 'transform 0.3s ease, color 0.3s ease',
            display: 'inline-block',
        },
    };

    if (loading) return <MainLayout title="About Me"><div>Loading...</div></MainLayout>;
    if (!info) return <MainLayout title="About Me"><div>Error loading information.</div></MainLayout>;

    return (
        <MainLayout title="About Me">
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .fade-in { opacity: 0; animation: fadeInUp 1s forwards; }
                .profile-card:hover { transform: translateY(-6px); box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
                .social-icons a:hover { transform: translateY(-4px); color: #c8a2ff !important; }
            `}</style>

            <div className="container py-5">
                <h2 className="fw-bold text-center mb-5 fade-in">About Me</h2>

                <div className="row g-5 align-items-center">
                    {/* Profile Image */}
                    <div className="col-md-4 fade-in">
                        <div className="p-3 shadow-lg text-center profile-card" style={styles.profileCard}>
                            <img src="/img/profile.jpg" alt="Sushma Thapa" className="img-fluid rounded-circle mb-3" />
                            <h4 className="fw-bold">Sushma Thapa</h4>
                            <p className="text-muted">BIM Student & Developer</p>
                            <div className="social-icons mt-3">
                                <a href="https://www.linkedin.com/in/sushma-thapa-015574275" target="_blank" rel="noreferrer" style={styles.socialIcon}><i className="bi bi-linkedin"></i></a>
                                <a href="https://github.com/Sushma0203" target="_blank" rel="noreferrer" style={styles.socialIcon}><i className="bi bi-github"></i></a>
                                <a href="mailto:sushmat952@email.com" style={styles.socialIcon}><i className="bi bi-envelope-fill"></i></a>
                            </div>
                        </div>
                    </div>

                    {/* Bio & Details */}
                    <div className="col-md-8 fade-in">
                        <div className="p-4 shadow-lg glass-card bio-card" style={styles.bioCard}>
                            <h4 className="fw-bold mb-3">Career Objective</h4>
                            <p>{info.career_objective}</p>

                            <h4 className="fw-bold mt-4 mb-3">Education</h4>
                            <ul className="list-unstyled">
                                <li><strong>Bachelor in Information Management</strong>, St. Xavier’s College — Present<br />Major: Computer Science, Management<br />Achievements: Scholarships, GPA, Honors</li>
                                <li className="mt-2"><strong>Schooling till Grade 12</strong>, St. Mary’s High School — 2009–2021<br />Major: Management<br />Achievements: Scholarships, GPA</li>
                            </ul>

                            <h4 className="fw-bold mt-4 mb-3">Skills</h4>
                            <div className="row">
                                <div className="col-md-6">
                                    <h6>Technical</h6>
                                    <p>
                                        {(info.technical_skills || ['Programming', 'Tools', 'Software']).join(', ')}
                                    </p>
                                </div>
                                <div className="col-md-6">
                                    <h6>Soft Skills</h6>
                                    <p>
                                        {(info.soft_skills || ['Communication', 'Teamwork']).join(', ')}
                                    </p>
                                </div>
                            </div>

                            <h4 className="fw-bold mt-4 mb-3">Achievements</h4>
                            <ul>
                                {(info.achievements || ['Scholarships & GPA honors', 'Volunteer work', 'Leadership roles']).map((ach, index) => (
                                    <li key={index}>{ach}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
