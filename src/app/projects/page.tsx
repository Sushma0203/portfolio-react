'use client';

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import axios from 'axios';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <MainLayout title="Projects">
            <section className="container py-5">
                <h2 className="section-title">My Projects</h2>
                {loading ? (
                    <div className="text-center py-5">Loading...</div>
                ) : (
                    <div className="row g-4">
                        {projects.map((project, i) => (
                            <div key={i} className="col-lg-4 col-md-6">
                                <div className="glass-card h-100 shadow-sm card-hover p-4">
                                    <img
                                        src={project.image_path.startsWith('/') ? project.image_path : '/' + project.image_path}
                                        alt={project.title}
                                        className="img-fluid rounded-4 mb-3 shadow-sm"
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                    <h4 className="fw-bold text-purple">{project.title}</h4>
                                    <p className="text-secondary small mb-3">{project.description}</p>
                                    <div className="d-flex flex-wrap gap-2">
                                        {Array.isArray(project.tech_stack) && project.tech_stack.map((tech: string, j: number) => (
                                            <span key={j} className="badge bg-light text-purple border">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </MainLayout>
    );
}
