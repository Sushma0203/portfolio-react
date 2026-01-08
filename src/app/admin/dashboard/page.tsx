'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Dashboard = () => {
    const [stats, setStats] = useState({
        galleryCount: 0,
        projectCount: 0,
        messageCount: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/admin/dashboard')
            .then(res => {
                setStats(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="welcome-section mb-5 text-center">
                <h1 className="fw-bold mb-2">Welcome Back, Admin!</h1>
                <p className="text-secondary">Manage your portfolio, messages, and site content effortlessly.</p>
            </div>

            <div className="row g-4">
                <div className="col-md-4">
                    <Link href="/admin/gallery" className="text-decoration-none">
                        <div className="stat-card glass-card p-4 h-100 shadow-sm" style={{ borderLeft: '5px solid #6f42c1' }}>
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h6 className="text-uppercase text-muted small fw-bold">Gallery Images</h6>
                                    <h2 className="fw-bold mb-0">{stats.galleryCount}</h2>
                                </div>
                                <div className="stat-icon bg-purple-light p-3 rounded-circle">
                                    <i className="bi bi-images text-purple fs-3" style={{ color: '#6f42c1' }}></i>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-md-4">
                    <Link href="/admin/projects" className="text-decoration-none">
                        <div className="stat-card glass-card p-4 h-100 shadow-sm" style={{ borderLeft: '5px solid #28a745' }}>
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h6 className="text-uppercase text-muted small fw-bold">Total Projects</h6>
                                    <h2 className="fw-bold mb-0">{stats.projectCount}</h2>
                                </div>
                                <div className="stat-icon bg-success-light p-3 rounded-circle">
                                    <i className="bi bi-code-slash text-success fs-3"></i>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="col-md-4">
                    <Link href="/admin/messages" className="text-decoration-none">
                        <div className="stat-card glass-card p-4 h-100 shadow-sm" style={{ borderLeft: '5px solid #ffc107' }}>
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h6 className="text-uppercase text-muted small fw-bold">New Messages</h6>
                                    <h2 className="fw-bold mb-0">{stats.messageCount}</h2>
                                </div>
                                <div className="stat-icon bg-warning-light p-3 rounded-circle">
                                    <i className="bi bi-envelope-check text-warning fs-3"></i>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="mt-5">
                <h4 className="fw-bold mb-4">Quick Actions</h4>
                <div className="row g-3">
                    <div className="col-sm-6 col-md-3">
                        <Link href="/admin/projects/create" className="btn btn-primary w-100 py-3 shadow-sm rounded-3">
                            <i className="bi bi-plus-circle me-2"></i> Add Project
                        </Link>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <Link href="/admin/gallery/create" className="btn btn-outline-purple w-100 py-3 shadow-sm rounded-3" style={{ color: '#6f42c1', borderColor: '#6f42c1' }}>
                            <i className="bi bi-image me-2"></i> Upload Photo
                        </Link>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <Link href="/admin/chatbot" className="btn btn-outline-dark w-100 py-3 shadow-sm rounded-3">
                            <i className="bi bi-robot me-2"></i> Chatbot settings
                        </Link>
                    </div>
                    <div className="col-sm-6 col-md-3">
                        <Link href="/admin/home" className="btn btn-outline-secondary w-100 py-3 shadow-sm rounded-3">
                            <i className="bi bi-gear me-2"></i> Site Settings
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
