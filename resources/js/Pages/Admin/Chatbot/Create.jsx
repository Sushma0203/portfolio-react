import React, { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = () => {
    const [data, setData] = useState({
        question: '',
        answer: ''
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        axios.post('/api/admin/chatbot', data)
            .then(() => navigate('/admin/chatbot'))
            .catch(err => {
                if (err.response && err.response.data.errors) {
                    setErrors(err.response.data.errors);
                } else {
                    alert('Error adding bot rule');
                }
            })
            .finally(() => setProcessing(false));
    };

    return (
        <AdminLayout title="Add Bot Rule">
            <div className="container-fluid p-4">
                <div className="mb-4">
                    <Link to="/admin/chatbot" className="btn btn-outline-secondary btn-sm mb-3">
                        <i className="bi bi-arrow-left me-2"></i>Back to Chatbot
                    </Link>
                    <h2 className="fw-bold">Add Automated Response</h2>
                </div>

                <div className="glass-card shadow-sm p-4 col-md-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">User Question Pattern</label>
                            <input
                                type="text"
                                className={`form-control ${errors.question ? 'is-invalid' : ''}`}
                                placeholder="What the user might ask (e.g. 'skills')"
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
                                placeholder="The answer bot should provide..."
                                value={data.answer}
                                onChange={(e) => setData({ ...data, answer: e.target.value })}
                                required
                            ></textarea>
                            {errors.answer && <div className="invalid-feedback">{errors.answer[0]}</div>}
                        </div>

                        <button type="submit" className="btn btn-primary px-5 shadow-sm" disabled={processing}>
                            {processing ? 'Saving...' : 'Add Rule'}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Create;
