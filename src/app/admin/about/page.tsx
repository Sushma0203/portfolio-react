'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Interface for About Data
interface AboutData {
    career_objective: string;
    technical_skills: string;
    soft_skills: string;
    achievements: string;
}

const AboutEdit = () => {
    const [data, setData] = useState<AboutData>({
        career_objective: '',
        technical_skills: '',
        soft_skills: '',
        achievements: ''
    });
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('/api/admin/about')
            .then(res => {
                const info = res.data.info;
                setData({
                    career_objective: info.career_objective || '',
                    technical_skills: Array.isArray(info.technical_skills) ? info.technical_skills.join(', ') : '',
                    soft_skills: Array.isArray(info.soft_skills) ? info.soft_skills.join(', ') : '',
                    achievements: Array.isArray(info.achievements) ? info.achievements.join(', ') : ''
                });
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

        const payload = {
            career_objective: data.career_objective,
            technical_skills: data.technical_skills.split(',').map((s: string) => s.trim()).filter((s: string) => s !== ''),
            soft_skills: data.soft_skills.split(',').map((s: string) => s.trim()).filter((s: string) => s !== ''),
            achievements: data.achievements.split(',').map((s: string) => s.trim()).filter((s: string) => s !== '')
        };

        try {
            const res = await axios.post('/api/admin/about', payload);
            setMessage(res.data.message);
        } catch (err: unknown) {
            console.error(err);
            alert('Error updating about info');
        } finally {
            setProcessing(false);
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="container-fluid">
            <h2 className="fw-bold mb-4 text-white">About Page Settings</h2>

            {message && <div className="alert alert-success">{message}</div>}

            <div className="glass-card shadow-lg p-5 col-lg-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="form-label fw-bold text-white">Career Objective</label>
                        <textarea
                            className="form-control bg-transparent text-white border-secondary"
                            rows={5}
                            value={data.career_objective}
                            onChange={e => setData({ ...data, career_objective: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold text-white">Technical Skills (comma separated)</label>
                        <input
                            type="text"
                            className="form-control bg-transparent text-white border-secondary"
                            value={data.technical_skills}
                            onChange={e => setData({ ...data, technical_skills: e.target.value })}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold text-white">Soft Skills (comma separated)</label>
                        <input
                            type="text"
                            className="form-control bg-transparent text-white border-secondary"
                            value={data.soft_skills}
                            onChange={e => setData({ ...data, soft_skills: e.target.value })}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold text-white">Achievements (comma separated)</label>
                        <textarea
                            className="form-control bg-transparent text-white border-secondary"
                            rows={3}
                            value={data.achievements}
                            onChange={e => setData({ ...data, achievements: e.target.value })}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary px-5 py-2 shadow-sm" disabled={processing}>
                        {processing ? 'Saving...' : 'Save Settings'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AboutEdit;
