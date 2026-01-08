'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Pagination from '@/components/Pagination';
import axios from 'axios';

const ProjectsIndex = () => {
    const [projects, setProjects] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const loadProjects = (url = '/api/admin/projects') => {
        setLoading(true);
        axios.get(url)
            .then(res => {
                setProjects(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            axios.delete(`/api/admin/projects/${id}`)
                .then(() => {
                    loadProjects();
                })
                .catch(() => alert('Error deleting project'));
        }
    };

    if (loading && !projects) return <div>Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold m-0 text-white">Project Management</h2>
                <Link href="/admin/projects/create" className="btn btn-success shadow-sm">
                    <i className="bi bi-plus-lg me-2"></i>Add New Project
                </Link>
            </div>

            <div className="glass-card shadow-sm p-4">
                <div className="table-responsive">
                    <table className="table table-hover align-middle text-white">
                        <thead className="table-dark">
                            <tr>
                                <th>Thumbnail</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th style={{ width: '150px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-transparent border-0">
                            {projects?.data.map((project: any) => (
                                <tr key={project.id.toString()} className="border-bottom border-secondary border-opacity-25">
                                    <td>
                                        <img src={`/${project.image_path}`} alt={project.title} width="80" className="rounded shadow-sm" />
                                    </td>
                                    <td className="fw-medium text-white">{project.title}</td>
                                    <td><span className="badge bg-secondary">{project.category}</span></td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Link href={`/admin/projects/edit/${project.id}`} className="btn btn-outline-info btn-sm rounded-circle p-2">
                                                <i className="bi bi-pencil"></i>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(project.id.toString())}
                                                className="btn btn-outline-danger btn-sm rounded-circle p-2"
                                                title="Delete"
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {projects?.data.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center py-5 text-muted">No projects found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {projects && projects.links.length > 3 && (
                    <div className="mt-4">
                        <Pagination links={projects.links} onPageClick={loadProjects} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectsIndex;
