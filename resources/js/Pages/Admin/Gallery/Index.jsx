import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Link } from 'react-router-dom';
import Pagination from '../../../Components/Pagination';
import axios from 'axios';

const Index = () => {
    const [images, setImages] = useState(null);
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

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this image?')) {
            axios.delete(`/api/admin/gallery/${id}`)
                .then(res => {
                    loadImages();
                })
                .catch(err => alert('Error deleting image'));
        }
    };

    if (loading && !images) return <AdminLayout title="Manage Gallery"><div>Loading...</div></AdminLayout>;

    return (
        <AdminLayout title="Manage Gallery">
            <div className="container-fluid p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold m-0">Gallery Images</h2>
                    <Link to="/admin/gallery/create" className="btn btn-primary shadow-sm">
                        <i className="bi bi-plus-lg me-2"></i>Upload Image
                    </Link>
                </div>

                <div className="glass-card shadow-sm p-4">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {images?.data.map((img) => (
                                    <tr key={img.id}>
                                        <td>
                                            <img src={`/${img.image_path}`} alt={img.title} width="100" className="rounded shadow-sm" />
                                        </td>
                                        <td className="fw-medium">{img.title || 'Untitled'}</td>
                                        <td>
                                            <button
                                                onClick={() => handleDelete(img.id)}
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
                                        <td colSpan="3" className="text-center py-5 text-muted">No images found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {images && images.links.length > 3 && (
                        <div className="mt-4">
                            {/* Pagination component needs to be updated too or use custom logic here */}
                            <Pagination links={images.links} onPageClick={loadImages} />
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default Index;
