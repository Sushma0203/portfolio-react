'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomeEdit = () => {
    const [data, setData] = useState<any>({
        hero_title: '',
        typed_strings: '',
        profile_image: null
    });
    const [existingImage, setExistingImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('/api/admin/home')
            .then(res => {
                const info = res.data.info;
                setData({
                    hero_title: info.hero_title || '',
                    typed_strings: Array.isArray(info.typed_strings) ? info.typed_strings.join(', ') : '',
                    profile_image: null
                });
                setExistingImage(info.profile_image || '');
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);
        setMessage('');

        const formData = new FormData();
        formData.append('hero_title', data.hero_title);
        const typedStringsArray = data.typed_strings.split(',').map((s: string) => s.trim()).filter((s: string) => s !== '');
        formData.append('typed_strings', JSON.stringify(typedStringsArray));
        if (data.profile_image) formData.append('profile_image', data.profile_image);

        try {
            const res = await axios.post('/api/admin/home', formData);
            setMessage(res.data.message);
            if (res.data.info.profile_image) setExistingImage(res.data.info.profile_image);
        } catch (err) {
            console.error(err);
            alert('Error updating home info');
        } finally {
            setProcessing(false);
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="container-fluid">
            <h2 className="fw-bold mb-4 text-white">Home Page Settings</h2>

            {message && <div className="alert alert-success">{message}</div>}

            <div className="glass-card shadow-lg p-5 col-lg-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="form-label fw-bold text-white">Hero Title</label>
                        <input
                            type="text"
                            className="form-control bg-transparent text-white border-secondary"
                            value={data.hero_title}
                            onChange={e => setData({ ...data, hero_title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold text-white">Animated Text (comma separated)</label>
                        <input
                            type="text"
                            className="form-control bg-transparent text-white border-secondary"
                            placeholder="Developer, Designer, Freelancer"
                            value={data.typed_strings}
                            onChange={e => setData({ ...data, typed_strings: e.target.value })}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold text-white">Profile Image</label>
                        <div className="d-flex align-items-center gap-3">
                            {existingImage && <img src={`/${existingImage}`} alt="Current" width="80" height="80" className="rounded-circle shadow-sm object-fit-cover" />}
                            <input
                                type="file"
                                className="form-control bg-transparent text-white border-secondary"
                                onChange={e => setData({ ...data, profile_image: e.target.files?.[0] })}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary px-5 py-2 shadow-sm" disabled={processing}>
                        {processing ? 'Saving...' : 'Save Settings'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HomeEdit;
