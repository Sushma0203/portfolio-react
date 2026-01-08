'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Pagination from '@/components/Pagination';
import axios from 'axios';

const GalleryIndex = () => {
    const [images, setImages] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const loadImages = (url = '/api/admin/gallery') => {
        setLoading(true);
        axios.get(url)
            .then(res => {
                setImages(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        loadImages();
    }, []);

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this image?')) {
            axios.delete(`/api/admin/gallery/${id}`)
                .then(() => {
                    loadImages();
                })
                .catch(() => alert('Error deleting image'));
        }
    };

    if (loading && !images) return <div>Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold m-0 text-white">Gallery Images</h2>
                <Link href="/admin/gallery/create" className="btn btn-primary shadow-sm">
                    <i className="bi bi-plus-lg me-2"></i>Upload Image
                </Link>
            </div>

            <div className="glass-card shadow-sm p-4">
                <div className="table-responsive">
                    <table className="table table-hover align-middle text-white">
                        <thead className="table-dark">
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th style={{ width: '100px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-transparent border-0">
                            {images?.data.map((img: any) => (
                                <tr key={img.id.toString()} className="border-bottom border-secondary border-opacity-25">
                                    <td>
                                        <img src={`/${img.image_path}`} alt={img.title} width="100" className="rounded shadow-sm" />
                                    </td>
                                    <td className="fw-medium text-white">{img.title || 'Untitled'}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(img.id.toString())}
                                            className="btn btn-outline-danger btn-sm rounded-circle p-2"
                                            title="Delete"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {images?.data.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="text-center py-5 text-muted">No images found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {images && images.links.length > 3 && (
                    <div className="mt-4">
                        <Pagination links={images.links} onPageClick={loadImages} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default GalleryIndex;
