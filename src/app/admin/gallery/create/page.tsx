'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const GalleryCreate = () => {
    const [data, setData] = useState<any>({
        image: null,
        title: ''
    });
    const [errors, setErrors] = useState<any>({});
    const [processing, setProcessing] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const formData = new FormData();
        formData.append('image', data.image);
        formData.append('title', data.title);

        try {
            await axios.post('/api/admin/gallery', formData);
            router.push('/admin/gallery');
        } catch (err: any) {
            if (err.response && err.response.data.errors) {
                setErrors(err.response.data.errors);
            } else {
                alert('Error uploading image');
            }
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="container-fluid">
            <div className="mb-4">
                <Link href="/admin/gallery" className="btn btn-outline-secondary btn-sm mb-3">
                    <i className="bi bi-arrow-left me-2"></i>Back to Gallery
                </Link>
                <h2 className="fw-bold text-white">Upload New Image</h2>
            </div>

            <div className="glass-card shadow-sm p-4 col-md-6 col-lg-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold text-white">Image File</label>
                        <input
                            type="file"
                            className={`form-control bg-transparent text-white border-secondary ${errors.image ? 'is-invalid' : ''}`}
                            onChange={(e) => setData((prev: any) => ({ ...prev, image: e.target.files?.[0] }))}
                            required
                        />
                        {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold text-white">Title (Optional)</label>
                        <input
                            type="text"
                            className="form-control bg-transparent text-white border-secondary"
                            placeholder="Enter image title"
                            value={data.title}
                            onChange={(e) => setData((prev: any) => ({ ...prev, title: e.target.value }))}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary px-4 py-2 shadow-sm w-100" disabled={processing}>
                        {processing ? 'Uploading...' : 'Upload Image'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GalleryCreate;
