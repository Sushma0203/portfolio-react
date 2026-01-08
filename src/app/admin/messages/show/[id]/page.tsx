'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

const MessageShow = () => {
    const { id } = useParams();
    const [msg, setMsg] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        axios.get(`/api/admin/messages/${id}`)
            .then(res => {
                setMsg(res.data.message);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                alert('Error fetching message');
                router.push('/admin/messages');
            });
    }, [id, router]);

    const handleDelete = () => {
        if (confirm('Delete this message?')) {
            axios.delete(`/api/admin/messages/${id}`)
                .then(() => {
                    router.push('/admin/messages');
                })
                .catch(() => alert('Error deleting message'));
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="mb-4">
                <Link href="/admin/messages" className="btn btn-outline-secondary btn-sm mb-3">
                    <i className="bi bi-arrow-left me-2"></i>Back to Inbox
                </Link>
                <h2 className="fw-bold text-white">Message Details</h2>
            </div>

            <div className="row">
                <div className="col-lg-8">
                    <div className="glass-card shadow-lg p-5">
                        <div className="d-flex justify-content-between align-items-start mb-4">
                            <div>
                                <h4 className="fw-bold text-purple mb-1">{msg.name}</h4>
                                <p className="text-secondary mb-0"><i className="bi bi-envelope me-2"></i>{msg.email}</p>
                                <small className="text-muted"><i className="bi bi-calendar-event me-2"></i>{new Date(msg.created_at).toLocaleString()}</small>
                            </div>
                            <button onClick={handleDelete} className="btn btn-outline-danger">
                                <i className="bi bi-trash me-2"></i>Delete
                            </button>
                        </div>

                        <hr className="my-4 border-secondary opacity-25" />

                        <div className="message-content text-white" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                            {msg.message}
                        </div>

                        <div className="mt-5">
                            <a href={`mailto:${msg.email}`} className="btn btn-primary px-4">
                                <i className="bi bi-reply-fill me-2"></i>Reply via Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageShow;
