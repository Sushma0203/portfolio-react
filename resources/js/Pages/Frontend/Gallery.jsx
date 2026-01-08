import React, { useState, useEffect } from 'react';
import MainLayout from '../../Layouts/MainLayout';
import axios from 'axios';

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        axios.get('/api/gallery-data')
            .then(res => {
                setImages(res.data.images || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const openLightbox = (img) => {
        setSelectedImage(img);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    if (loading) return <MainLayout title="Gallery"><div>Loading...</div></MainLayout>;

    return (
        <MainLayout title="Gallery">
            {/* Styles for Masonry Grid and Lightbox */}
            <style>{`
                .gallery-grid {
                    column-count: 3;
                    column-gap: 1rem;
                }
                .gallery-item {
                    break-inside: avoid;
                    margin-bottom: 1rem;
                    overflow: hidden;
                    border-radius: 12px;
                    position: relative;
                    cursor: pointer;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .gallery-item img {
                    width: 100%;
                    border-radius: 12px;
                    transition: transform 0.3s ease;
                    display: block;
                }
                .gallery-item:hover img {
                    transform: scale(1.05);
                    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                }
                .fade-in {
                    opacity: 0;
                    animation: fadeInUp 1s forwards;
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @media (max-width: 992px) {
                    .gallery-grid { column-count: 2; }
                }
                @media (max-width: 576px) {
                    .gallery-grid { column-count: 1; }
                }

                /* Lightbox Styles */
                .lightbox-backdrop {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0,0,0,0.9); z-index: 1060;
                    display: flex; justify-content: center; align-items: center;
                }
                .lightbox-content {
                    max-width: 90%; max-height: 90vh;
                    position: relative;
                }
                .lightbox-content img {
                    max-width: 100%; max-height: 90vh;
                    border-radius: 5px; box-shadow: 0 0 20px rgba(255,255,255,0.2);
                }
                .lightbox-close {
                    position: absolute; top: -40px; right: 0;
                    color: white; font-size: 30px; cursor: pointer; background: none; border: none;
                }
            `}</style>

            <div className="container py-5">
                <h2 className="fw-bold text-center mb-5 fade-in">Gallery</h2>

                <div className="gallery-grid">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className="gallery-item fade-in"
                            style={{ animationDelay: `${index * 0.05}s` }}
                            onClick={() => openLightbox(img)}
                        >
                            <img
                                src={img.image_path}
                                loading="lazy"
                                className="img-fluid rounded shadow-sm"
                                alt={img.title || 'Gallery Image'}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="lightbox-backdrop" onClick={closeLightbox}>
                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                        <button className="lightbox-close" onClick={closeLightbox}>&times;</button>
                        <img src={selectedImage.image_path} alt={selectedImage.title || 'Gallery Image'} />
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
