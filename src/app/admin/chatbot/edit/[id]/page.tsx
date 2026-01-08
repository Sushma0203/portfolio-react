'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const ChatbotEdit = () => {
    const { id } = useParams();
    const [data, setData] = useState({
        question: '',
        answer: ''
    });
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        axios.get(`/api/admin/chatbot/${id}`)
            .then(res => {
                setData({
                    question: res.data.response.question,
                    answer: res.data.response.answer
                });
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                alert('Error fetching rule');
                router.push('/admin/chatbot');
            });
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        try {
            await axios.put(`/api/admin/chatbot/${id}`, data);
            router.push('/admin/chatbot');
        } catch (err) {
            console.error(err);
            alert('Error updating rule');
        } finally {
            setProcessing(false);
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="mb-4">
                <Link href="/admin/chatbot" className="btn btn-outline-secondary btn-sm mb-3 text-white border-secondary">
                    <i className="bi bi-arrow-left me-2"></i>Back to Rules
                </Link>
                <h2 className="fw-bold text-white">Edit Chatbot Rule</h2>
            </div>

            <div className="glass-card shadow-sm p-4 col-md-8 col-lg-6">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold text-white">Trigger Question / Keyword</label>
                        <input
                            type="text"
                            className="form-control bg-transparent text-white border-secondary"
                            value={data.question}
                            onChange={e => setData({ ...data, question: e.target.value })}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold text-white">Bot Response</label>
                        <textarea
                            className="form-control bg-transparent text-white border-secondary"
                            rows={4}
                            value={data.answer}
                            onChange={e => setData({ ...data, answer: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-info px-5 py-2 shadow-sm w-100 text-white" disabled={processing}>
                        {processing ? 'Saving...' : 'Update Rule'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatbotEdit;
