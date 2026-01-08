'use client';

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import axios from 'axios';

export default function GalleryPage() {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/public/gallery-data')
            .then(res => {
                setImages(res.data.images);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <MainLayout title="Gallery">
            <section className="container py-5">
                <h2 className="section-title">Gallery</h2>
                {loading ? (
                    <div className="text-center py-5">Loading...</div>
                ) : (
                    <div className="row g-4">
                        {images.map((img, i) => (
                            <div key={i} className="col-md-4 col-sm-6">
                                <div className="glass-card h-100 overflow-hidden shadow-sm card-hover">
                                    <img
                                        src={img.image_path.startsWith('/') ? img.image_path : '/' + img.image_path}
                                        alt={img.title || 'Gallery image'}
                                        className="img-fluid"
                                        style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                                    />
                                    {img.title && <div className="p-3 text-center fw-medium">{img.title}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </MainLayout>
    );
}
