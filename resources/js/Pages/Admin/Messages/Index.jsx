import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Link } from 'react-router-dom';
import Pagination from '../../../Components/Pagination';
import axios from 'axios';

const Index = () => {
    const [messages, setMessages] = useState(null);
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

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this message?')) {
            axios.delete(`/api/admin/messages/${id}`)
                .then(() => loadMessages())
                .catch(() => alert('Error deleting message'));
        }
    };

    if (loading && !messages) return <AdminLayout title="Messages"><div>Loading...</div></AdminLayout>;

    return (
        <AdminLayout title="Messages">
            <div className="container-fluid p-4">
                <h2 className="fw-bold mb-4">Inquiries & Messages</h2>

                <div className="glass-card shadow-sm p-4">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages?.data.map((msg) => (
                                    <tr key={msg.id} className={!msg.is_read ? 'fw-bold' : ''}>
                                        <td>{msg.name}</td>
                                        <td>{msg.email}</td>
                                        <td>{new Date(msg.created_at).toLocaleDateString()}</td>
                                        <td>
                                            {msg.is_read ? (
                                                <span className="badge bg-light text-secondary border">Read</span>
                                            ) : (
                                                <span className="badge bg-purple-light text-purple">New</span>
                                            )}
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <Link to={`/admin/messages/${msg.id}`} className="btn btn-outline-primary btn-sm rounded-circle p-2 shadow-sm" title="View">
                                                    <i className="bi bi-eye"></i>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(msg.id)}
                                                    className="btn btn-outline-danger btn-sm rounded-circle p-2 shadow-sm"
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
                                        <td colSpan="5" className="text-center py-5 text-muted">No messages yet.</td>
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
        </AdminLayout>
    );
};

export default Index;
