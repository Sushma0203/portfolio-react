import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Index = () => {
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadResponses = () => {
        setLoading(true);
        axios.get('/api/admin/chatbot')
            .then(res => {
                setResponses(res.data.responses);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        loadResponses();
    }, []);

    const handleDelete = (id) => {
        if (confirm('Delete this automated response?')) {
            axios.delete(`/api/admin/chatbot/${id}`)
                .then(() => loadResponses())
                .catch(() => alert('Error deleting response'));
        }
    };

    if (loading) return <AdminLayout title="Chatbot Management"><div>Loading...</div></AdminLayout>;

    return (
        <AdminLayout title="Chatbot Management">
            <div className="container-fluid p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold m-0">Chatbot Training</h2>
                    <Link to="/admin/chatbot/create" className="btn btn-primary shadow-sm">
                        <i className="bi bi-plus-lg me-2"></i>Add Rule
                    </Link>
                </div>

                <div className="glass-card shadow-sm p-4">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Question Pattern</th>
                                    <th>Bot Response</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {responses.map((resp) => (
                                    <tr key={resp.id}>
                                        <td className="fw-medium">{resp.question}</td>
                                        <td className="text-secondary">{resp.answer}</td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <Link to={`/admin/chatbot/${resp.id}/edit`} className="btn btn-outline-primary btn-sm rounded-circle p-2 shadow-sm">
                                                    <i className="bi bi-pencil"></i>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(resp.id)}
                                                    className="btn btn-outline-danger btn-sm rounded-circle p-2 shadow-sm"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {responses.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="text-center py-5 text-muted">No rules defined. Bot will use default message.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Index;
