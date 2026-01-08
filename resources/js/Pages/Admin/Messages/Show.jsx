import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Show = () => {
    const { id } = useParams();
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/admin/messages/${id}`)
            .then(res => {
                setMessage(res.data.message);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                alert('Error loading message');
                navigate('/admin/messages');
            });
    }, [id, navigate]);

    if (loading) return <AdminLayout title="View Message"><div>Loading...</div></AdminLayout>;

    return (
        <AdminLayout title="View Message">
            <div className="container-fluid p-4">
                <div className="mb-4">
                    <Link to="/admin/messages" className="btn btn-outline-secondary btn-sm mb-3 text-decoration-none">
                        <i className="bi bi-arrow-left me-2"></i>Back to Messages
                    </Link>
                    <h2 className="fw-bold">Message from {message.name}</h2>
                </div>

                <div className="glass-card shadow-sm p-4">
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold text-muted">Email</div>
                        <div className="col-md-9">{message.email}</div>
                    </div>
                    <hr className="opacity-10" />
                    <div className="row mb-3">
                        <div className="col-md-3 fw-bold text-muted">Sent At</div>
                        <div className="col-md-9">{new Date(message.created_at).toLocaleString()}</div>
                    </div>
                    <hr className="opacity-10" />
                    <div className="row">
                        <div className="col-md-3 fw-bold text-muted">Message Content</div>
                        <div className="col-md-9 bg-light p-4 rounded-3 mt-2" style={{ whiteSpace: 'pre-wrap' }}>
                            {message.message}
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <button
                        onClick={() => {
                            if (confirm('Delete this message?')) {
                                axios.delete(`/api/admin/messages/${id}`).then(() => navigate('/admin/messages'));
                            }
                        }}
                        className="btn btn-danger px-4"
                    >
                        <i className="bi bi-trash me-2"></i>Delete Message
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Show;
