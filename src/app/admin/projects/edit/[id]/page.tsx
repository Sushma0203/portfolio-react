'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

interface ProjectForm {
    title: string;
    description: string;
    category: string;
    tech_stack: string;
    image: File | null;
}

const ProjectEdit = () => {
    const { id } = useParams();
    const [data, setData] = useState<ProjectForm>({
        title: '',
        description: '',
        category: '',
        tech_stack: '',
        image: null
    });
    const [existingImage, setExistingImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        axios.get(`/api/admin/projects/${id}`)
            .then(res => {
                const project = res.data.project;
                setData({
                    title: project.title,
                    description: project.description,
                    category: project.category,
                    tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack.join(', ') : '',
                    image: null
                });
                setExistingImage(project.image_path);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                alert('Error fetching project');
            });
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);

        const techStackArray = data.tech_stack.split(',').map((s: string) => s.trim()).filter((s: string) => s !== '');
        formData.append('tech_stack', JSON.stringify(techStackArray));

        if (data.image) formData.append('image', data.image);

        try {
            // We use POST to handle multipart form data for updates in our API route setup
            await axios.post(`/api/admin/projects/${id}`, formData);
            router.push('/admin/projects');
        } catch (err: unknown) {
            console.error(err);
            alert('Error updating project');
        } finally {
            setProcessing(false);
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="mb-4">
                <Link href="/admin/projects" className="btn btn-outline-secondary btn-sm mb-3">
                    <i className="bi bi-arrow-left me-2"></i>Back to Projects
                </Link>
                <h2 className="fw-bold text-white">Edit Project</h2>
            </div>

            <div className="glass-card shadow-sm p-4 col-lg-8">
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-8">
                            <label className="form-label fw-bold text-white">Project Title</label>
                            <input
                                type="text"
                                className="form-control bg-transparent text-white border-secondary"
                                value={data.title}
                                onChange={e => setData({ ...data, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label fw-bold text-white">Category</label>
                            <select
                                className="form-select bg-transparent text-white border-secondary"
                                value={data.category}
                                onChange={e => setData({ ...data, category: e.target.value })}
                            >
                                <option className="bg-dark" value="Web Development">Web Development</option>
                                <option className="bg-dark" value="Mobile App">Mobile App</option>
                                <option className="bg-dark" value="UI/UX Design">UI/UX Design</option>
                                <option className="bg-dark" value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label className="form-label fw-bold text-white">Description</label>
                            <textarea
                                className="form-control bg-transparent text-white border-secondary"
                                rows={4}
                                value={data.description}
                                onChange={e => setData({ ...data, description: e.target.value })}
                                required
                            ></textarea>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold text-white">Tech Stack (comma separated)</label>
                            <input
                                type="text"
                                className="form-control bg-transparent text-white border-secondary"
                                value={data.tech_stack}
                                onChange={e => setData({ ...data, tech_stack: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold text-white">Change Thumbnail (optional)</label>
                            <input
                                type="file"
                                className="form-control bg-transparent text-white border-secondary"
                                onChange={e => setData({ ...data, image: e.target.files?.[0] || null })}
                            />
                            {existingImage && <div className="mt-2 small text-muted">Current: {existingImage}</div>}
                        </div>
                    </div>

                    <button type="submit" className="btn btn-info px-5 py-2 mt-4 shadow-sm text-white" disabled={processing}>
                        {processing ? 'Saving...' : 'Update Project'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProjectEdit;
