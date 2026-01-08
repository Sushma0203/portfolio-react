'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Pagination from '@/components/Pagination';
import axios from 'axios';

const MessagesIndex = () => {
    const [messages, setMessages] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const loadMessages = (url = '/api/admin/messages') => {
        setLoading(true);
        axios.get(url)
            .then(res => {
                setMessages(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        loadMessages();
    }, []);

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this message?')) {
            axios.delete(`/api/admin/messages/${id}`)
                .then(() => {
                    loadMessages();
                })
                .catch(() => alert('Error deleting message'));
        }
    };

    if (loading && !messages) return <div>Loading...</div>;

    return (
        <div className="container-fluid">
            <h2 className="fw-bold mb-4 text-white">Inbox / Messages</h2>

            <div className="glass-card shadow-sm p-4">
                <div className="table-responsive">
                    <table className="table table-hover align-middle text-white">
                        <thead className="table-dark">
                            <tr>
                                <th>Status</th>
                                <th>From</th>
                                <th>Subject/Preview</th>
                                <th>Date</th>
                                <th style={{ width: '120px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-transparent border-0">
                            {messages?.data.map((msg: any) => (
                                <tr key={msg.id.toString()} className={`border-bottom border-secondary border-opacity-25 ${!msg.is_read ? 'fw-bold border-start border-4 border-primary' : ''}`}>
                                    <td>
                                        {!msg.is_read ? (
                                            <span className="badge bg-primary">New</span>
                                        ) : (
                                            <span className="badge bg-light text-dark">Read</span>
                                        )}
                                    </td>
                                    <td className="text-white">
                                        {msg.name}<br />
                                        <small className="text-secondary">{msg.email}</small>
                                    </td>
                                    <td className="text-white">
                                        <div className="text-truncate" style={{ maxWidth: '250px' }}>
                                            {msg.message}
                                        </div>
                                    </td>
                                    <td className="text-secondary small">
                                        {new Date(msg.created_at).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Link href={`/admin/messages/show/${msg.id}`} className="btn btn-outline-info btn-sm rounded-circle p-2">
                                                <i className="bi bi-eye"></i>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(msg.id.toString())}
                                                className="btn btn-outline-danger btn-sm rounded-circle p-2"
                                                title="Delete"
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {messages?.data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center py-5 text-muted">No messages found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {messages && messages.links.length > 3 && (
                    <div className="mt-4">
                        <Pagination links={messages.links} onPageClick={loadMessages} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessagesIndex;
