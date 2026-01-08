'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const ChatbotCreate = () => {
    const [data, setData] = useState({
        question: '',
        answer: ''
    });
    const [processing, setProcessing] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        try {
            await axios.post('/api/admin/chatbot', data);
            router.push('/admin/chatbot');
        } catch (err) {
            console.error(err);
            alert('Error creating rule');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="container-fluid">
            <div className="mb-4">
                <Link href="/admin/chatbot" className="btn btn-outline-secondary btn-sm mb-3 text-white border-secondary">
                    <i className="bi bi-arrow-left me-2"></i>Back to Rules
                </Link>
                <h2 className="fw-bold text-white">Add Chatbot Rule</h2>
            </div>

            <div className="glass-card shadow-sm p-4 col-md-8 col-lg-6">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold text-white">Trigger Question / Keyword</label>
                        <input
                            type="text"
                            className="form-control bg-transparent text-white border-secondary"
                            placeholder="e.g. hello, prices, contact"
                            value={data.question}
                            onChange={e => setData({ ...data, question: e.target.value })}
                            required
                        />
                        <div className="form-text text-secondary opacity-75">What the user might type.</div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold text-white">Bot Response</label>
                        <textarea
                            className="form-control bg-transparent text-white border-secondary"
                            rows={4}
                            placeholder="What the bot should say in return..."
                            value={data.answer}
                            onChange={e => setData({ ...data, answer: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary px-5 py-2 shadow-sm w-100" disabled={processing}>
                        {processing ? 'Saving...' : 'Create Rule'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatbotCreate;
