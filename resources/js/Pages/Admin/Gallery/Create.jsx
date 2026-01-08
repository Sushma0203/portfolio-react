import React, { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = () => {
    const [data, setData] = useState({
        image: null,
        title: ''
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const formData = new FormData();
        formData.append('image', data.image);
        formData.append('title', data.title);

        axios.post('/api/admin/gallery', formData)
            .then(res => {
                navigate('/admin/gallery');
            })
            .catch(err => {
                if (err.response && err.response.data.errors) {
                    setErrors(err.response.data.errors);
                } else {
                    alert('Error uploading image');
                }
            })
            .finally(() => {
                setProcessing(false);
            });
    };

    return (
        <AdminLayout title="Upload Image">
            <div className="container-fluid p-4">
                <div className="mb-4">
                    <Link to="/admin/gallery" className="btn btn-outline-secondary btn-sm mb-3">
                        <i className="bi bi-arrow-left me-2"></i>Back to Gallery
                    </Link>
                    <h2 className="fw-bold">Upload New Image</h2>
                </div>

                <div className="glass-card shadow-sm p-4 col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Image File</label>
                            <input
                                type="file"
                                className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                                onChange={(e) => setData(prev => ({ ...prev, image: e.target.files[0] }))}
                                required
                            />
                            {errors.image && <div className="invalid-feedback">{errors.image[0]}</div>}
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold">Title (Optional)</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter image title"
                                value={data.title}
                                onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary px-4 py-2 shadow-sm" disabled={processing}>
                            {processing ? 'Uploading...' : 'Upload Image'}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Create;
