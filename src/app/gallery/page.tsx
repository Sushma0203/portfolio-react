'use client';

import React, { useEffect, useState } from 'react';
import MainLayout from '@/components/MainLayout';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ZoomIn } from 'lucide-react';

export default function GalleryPage() {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<any>(null);

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
            {/* Full Screen Image Viewer (Lightbox) */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-8 right-8 p-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all z-20"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={24} />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative max-w-7xl max-h-full flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage?.image_path ? (selectedImage.image_path.startsWith('/') ? selectedImage.image_path : '/' + selectedImage.image_path) : "/img/placeholder.jpg"}
                                alt={selectedImage?.title || 'Gallery image'}
                                className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                            />
                            {selectedImage?.title && (
                                <div className="mt-8 text-center text-white">
                                    <h3 className="text-2xl font-bold font-heading">{selectedImage.title}</h3>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <section className="container mx-auto px-6 py-24 min-h-screen">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-bold font-heading mb-4 text-black dark:text-white tracking-tight">Visual <span className="text-purple-600 dark:text-purple-400">Archives</span></h2>
                    <p className="text-black dark:text-gray-400 text-lg">A visual journey through my projects, experiences, and creative perspectives.</p>
                </motion.div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
                        <p className="text-black dark:text-gray-500 font-medium italic">Developing film...</p>
                    </div>
                ) : (
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-8">
                        {images.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="relative group cursor-pointer break-inside-avoid mb-8"
                                onClick={() => setSelectedImage(img)}
                            >
                                <div className="glass-card overflow-hidden h-full bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl transition-all hover:scale-[1.02] hover:shadow-2xl">
                                    <div className="relative">
                                        <img
                                            src={img?.image_path ? (img.image_path.startsWith('/') ? img.image_path : '/' + img.image_path) : "/img/placeholder.jpg"}
                                            alt={img?.title || 'Gallery image'}
                                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl text-white">
                                                <Maximize2 size={24} />
                                            </div>
                                        </div>
                                    </div>
                                    {img?.title && (
                                        <div className="p-6">
                                            <p className="text-sm font-bold text-black dark:text-gray-300 text-center uppercase tracking-widest">{img.title}</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>
        </MainLayout>
    );
}
