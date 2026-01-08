import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {
    const { id } = useParams();
    const [data, setData] = useState({
        title: '',
        image: null,
        description: '',
        category: '',
        tech_stack: ['']
    });
    const [existingImage, setExistingImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/admin/projects/${id}/edit`)
            .then(res => {
                const project = res.data.project;
                setData({
                    title: project.title,
                    image: null,
                    description: project.description,
                    category: project.category,
                    tech_stack: project.tech_stack || ['']
                });
                setExistingImage(project.image_path);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                alert('Error loading project');
                navigate('/admin/projects');
            });
    }, [id, navigate]);

    const handleTechChange = (index, value) => {
        const newTech = [...data.tech_stack];
        newTech[index] = value;
        setData({ ...data, tech_stack: newTech });
    };

    const addTech = () => {
        setData({ ...data, tech_stack: [...data.tech_stack, ''] });
    };

    const removeTech = (index) => {
        const newTech = data.tech_stack.filter((_, i) => i !== index);
        setData({ ...data, tech_stack: newTech });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const formData = new FormData();
        formData.append('_method', 'PUT'); // Laravel requirement for spoofing PUT with FormData
        formData.append('title', data.title);
        if (data.image) formData.append('image', data.image);
        formData.append('description', data.description);
        formData.append('category', data.category);
        data.tech_stack.forEach((tech, index) => {
            formData.append(`tech_stack[${index}]`, tech);
        });

        // Use POST with _method=PUT for file uploads in Laravel
        axios.post(`/api/admin/projects/${id}`, formData)
            .then(() => navigate('/admin/projects'))
            .catch(err => {
                if (err.response && err.response.data.errors) {
                    setErrors(err.response.data.errors);
                } else {
                    alert('Error updating project');
                }
            })
            .finally(() => setProcessing(false));
    };

    if (loading) return <AdminLayout title="Edit Project"><div>Loading...</div></AdminLayout>;

    return (
        <AdminLayout title="Edit Project">
            <div className="container-fluid p-4">
                <div className="mb-4">
                    <Link to="/admin/projects" className="btn btn-outline-secondary btn-sm mb-3 text-decoration-none">
                        <i className="bi bi-arrow-left me-2"></i>Back to Projects
                    </Link>
                    <h2 className="fw-bold">Edit Project</h2>
                </div>

                <div className="glass-card shadow-sm p-4 col-lg-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Project Title</label>
                            <input
                                type="text"
                                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                value={data.title}
                                onChange={(e) => setData({ ...data, title: e.target.value })}
                                required
                            />
                            {errors.title && <div className="invalid-feedback">{errors.title[0]}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Project Image</label>
                            {existingImage && (
                                <div className="mb-2">
                                    <p className="small text-muted mb-1">Current Image:</p>
                                    <img src={`/${existingImage}`} alt="Current" width="150" className="rounded shadow-sm" />
                                </div>
                            )}
                            <input
                                type="file"
                                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                                onChange={(e) => setData({ ...data, image: e.target.files[0] })}
                            />
                            <p className="small text-muted mt-1">Leave empty to keep current image</p>
                            {errors.image && <div className="invalid-feedback">{errors.image[0]}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Category</label>
                            <select
                                className={`form-select ${errors.category ? 'is-invalid' : ''}`}
                                value={data.category}
                                onChange={(e) => setData({ ...data, category: e.target.value })}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="laravel">Laravel</option>
                                <option value="python">Python</option>
                                <option value="js">HTML/CSS/JS</option>
                                <option value="c">C</option>
                                <option value="dotnet">.NET Core</option>
                            </select>
                            {errors.category && <div className="invalid-feedback">{errors.category[0]}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Description</label>
                            <textarea
                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                rows="4"
                                value={data.description}
                                onChange={(e) => setData({ ...data, description: e.target.value })}
                                required
                            ></textarea>
                            {errors.description && <div className="invalid-feedback">{errors.description[0]}</div>}
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold d-block">Tech Stack</label>
                            {data.tech_stack.map((tech, index) => (
                                <div key={index} className="d-flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={tech}
                                        onChange={(e) => handleTechChange(index, e.target.value)}
                                        placeholder="e.g. React"
                                        required
                                    />
                                    {data.tech_stack.length > 1 && (
                                        <button type="button" className="btn btn-outline-danger" onClick={() => removeTech(index)}>
                                            <i className="bi bi-dash-lg"></i>
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button type="button" className="btn btn-outline-primary btn-sm" onClick={addTech}>
                                <i className="bi bi-plus-lg me-2"></i>Add Tech
                            </button>
                        </div>

                        <button type="submit" className="btn btn-primary px-5 py-2 shadow-sm" disabled={processing}>
                            {processing ? 'Updating...' : 'Update Project'}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Edit;
