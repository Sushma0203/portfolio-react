'use client';

import React, { useState } from 'react';
import MainLayout from '@/components/MainLayout';
import axios from 'axios';

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState<any>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setStatus(null);

        try {
            const res = await axios.post('/api/public/contact-submit', formData);
            if (res.data.success) {
                setStatus({ type: 'success', message: 'Message sent successfully!' });
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus({ type: 'error', message: res.data.message || 'Something went wrong.' });
            }
        } catch (err: any) {
            console.error(err);
            setStatus({ type: 'error', message: err.response?.data?.error || 'Error sending message.' });
        } finally {
            setSending(false);
        }
    };

    return (
        <MainLayout title="Contact">
            <section className="container py-5">
                <h2 className="section-title">Get In Touch</h2>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="glass-card p-5 shadow-lg fade-in">

                            {status && (
                                <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'} shadow-sm`}>
                                    {status.message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control rounded-pill"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control rounded-pill"
                                        required
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Message</label>
                                    <textarea
                                        className="form-control rounded-4"
                                        rows={5}
                                        required
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="How can I help you?"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-3 rounded-pill fw-bold"
                                    disabled={sending}
                                >
                                    {sending ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
