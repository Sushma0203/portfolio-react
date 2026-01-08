import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {
    const { id } = useParams();
    const [data, setData] = useState({
        question: '',
        answer: ''
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/admin/chatbot/${id}/edit`)
            .then(res => {
                const rule = res.data.response;
                setData({
                    question: rule.question,
                    answer: rule.answer
                });
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                alert('Error loading rule');
                navigate('/admin/chatbot');
            });
    }, [id, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        axios.put(`/api/admin/chatbot/${id}`, data)
            .then(() => navigate('/admin/chatbot'))
            .catch(err => {
                if (err.response && err.response.data.errors) {
                    setErrors(err.response.data.errors);
                } else {
                    alert('Error updating rule');
                }
            })
            .finally(() => setProcessing(false));
    };

    if (loading) return <AdminLayout title="Edit Bot Rule"><div>Loading...</div></AdminLayout>;

    return (
        <AdminLayout title="Edit Bot Rule">
            <div className="container-fluid p-4">
                <div className="mb-4">
                    <Link to="/admin/chatbot" className="btn btn-outline-secondary btn-sm mb-3 text-decoration-none">
                        <i className="bi bi-arrow-left me-2"></i>Back to Chatbot
                    </Link>
                    <h2 className="fw-bold">Edit Automated Response</h2>
                </div>

                <div className="glass-card shadow-sm p-4 col-md-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">User Question Pattern</label>
                            <input
                                type="text"
                                className={`form-control ${errors.question ? 'is-invalid' : ''}`}
                                value={data.question}
                                onChange={(e) => setData({ ...data, question: e.target.value })}
                                required
                            />
                            {errors.question && <div className="invalid-feedback">{errors.question[0]}</div>}
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold">Bot Response</label>
                            <textarea
                                className={`form-control ${errors.answer ? 'is-invalid' : ''}`}
                                rows="3"
                                value={data.answer}
                                onChange={(e) => setData({ ...data, answer: e.target.value })}
                                required
                            ></textarea>
                            {errors.answer && <div className="invalid-feedback">{errors.answer[0]}</div>}
                        </div>

                        <button type="submit" className="btn btn-primary px-5 shadow-sm" disabled={processing}>
                            {processing ? 'Updating...' : 'Update Rule'}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Edit;
