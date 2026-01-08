import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Link } from 'react-router-dom';
import Pagination from '../../../Components/Pagination';
import axios from 'axios';

const Index = () => {
    const [projects, setProjects] = useState(null);
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

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this project?')) {
            axios.delete(`/api/admin/projects/${id}`)
                .then(() => loadProjects())
                .catch(() => alert('Error deleting project'));
        }
    };

    if (loading && !projects) return <AdminLayout title="Manage Projects"><div>Loading...</div></AdminLayout>;

    return (
        <AdminLayout title="Manage Projects">
            <div className="container-fluid p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold m-0">Projects</h2>
                    <Link to="/admin/projects/create" className="btn btn-primary shadow-sm">
                        <i className="bi bi-plus-lg me-2"></i>Add Project
                    </Link>
                </div>

                <div className="glass-card shadow-sm p-4">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects?.data.map((project) => (
                                    <tr key={project.id}>
                                        <td>
                                            <img src={`/${project.image_path}`} alt={project.title} width="80" className="rounded shadow-sm" />
                                        </td>
                                        <td className="fw-bold">{project.title}</td>
                                        <td><span className="badge bg-purple-light text-purple" style={{ color: '#6f42c1', background: 'rgba(111, 66, 193, 0.1)' }}>{project.category}</span></td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <Link to={`/admin/projects/${project.id}/edit`} className="btn btn-outline-primary btn-sm rounded-circle p-2 shadow-sm" title="Edit">
                                                    <i className="bi bi-pencil"></i>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(project.id)}
                                                    className="btn btn-outline-danger btn-sm rounded-circle p-2 shadow-sm"
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
                                        <td colSpan="4" className="text-center py-5 text-muted">No projects found.</td>
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
        </AdminLayout>
    );
};

export default Index;
