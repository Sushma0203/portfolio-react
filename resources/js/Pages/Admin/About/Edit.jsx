import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import axios from 'axios';

const Edit = () => {
    const [data, setData] = useState({
        career_objective: '',
        technical_skills: [''],
        soft_skills: [''],
        achievements: ['']
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        axios.get('/api/admin/about-info/edit')
            .then(res => {
                const info = res.data.info;
                setData({
                    career_objective: info.career_objective || '',
                    technical_skills: info.technical_skills || [''],
                    soft_skills: info.soft_skills || [''],
                    achievements: info.achievements || ['']
                });
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleArrayChange = (field, index, value) => {
        const newArr = [...data[field]];
        newArr[index] = value;
        setData({ ...data, [field]: newArr });
    };

    const addItem = (field) => {
        setData({ ...data, [field]: [...data[field], ''] });
    };

    const removeItem = (field, index) => {
        const newArr = data[field].filter((_, i) => i !== index);
        setData({ ...data, [field]: newArr });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        setSuccessMsg('');

        axios.put('/api/admin/about-info', data)
            .then(() => {
                setSuccessMsg('About information updated successfully!');
                setTimeout(() => setSuccessMsg(''), 3000);
            })
            .catch(err => {
                if (err.response && err.response.data.errors) {
                    setErrors(err.response.data.errors);
                } else {
                    alert('Error updating about info');
                }
            })
            .finally(() => setProcessing(false));
    };

    if (loading) return <AdminLayout title="Edit About Info"><div>Loading...</div></AdminLayout>;

    return (
        <AdminLayout title="Edit About Info">
            <div className="container-fluid p-4">
                <h2 className="fw-bold mb-4">Edit About Section</h2>

                {successMsg && (
                    <div className="alert alert-success shadow-sm mb-4 border-0">
                        <i className="bi bi-check-circle-fill me-2"></i>{successMsg}
                    </div>
                )}

                <div className="glass-card shadow-sm p-4 col-lg-10">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label fw-bold">Career Objective</label>
                            <textarea
                                className={`form-control border-2 ${errors.career_objective ? 'is-invalid' : ''}`}
                                rows="4"
                                value={data.career_objective}
                                onChange={(e) => setData({ ...data, career_objective: e.target.value })}
                                required
                            ></textarea>
                            {errors.career_objective && <div className="invalid-feedback">{errors.career_objective[0]}</div>}
                        </div>

                        <div className="row">
                            {/* Technical Skills */}
                            <div className="col-md-6 mb-4">
                                <label className="form-label fw-bold d-block">Technical Skills</label>
                                {data.technical_skills.map((skill, index) => (
                                    <div key={index} className="d-flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            className="form-control border-2"
                                            value={skill}
                                            onChange={(e) => handleArrayChange('technical_skills', index, e.target.value)}
                                            required
                                        />
                                        {data.technical_skills.length > 1 && (
                                            <button type="button" className="btn btn-outline-danger" onClick={() => removeItem('technical_skills', index)}>
                                                <i className="bi bi-dash-lg"></i>
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => addItem('technical_skills')}>
                                    <i className="bi bi-plus-lg me-2"></i>Add Skill
                                </button>
                            </div>

                            {/* Soft Skills */}
                            <div className="col-md-6 mb-4">
                                <label className="form-label fw-bold d-block">Soft Skills</label>
                                {data.soft_skills.map((skill, index) => (
                                    <div key={index} className="d-flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            className="form-control border-2"
                                            value={skill}
                                            onChange={(e) => handleArrayChange('soft_skills', index, e.target.value)}
                                            required
                                        />
                                        {data.soft_skills.length > 1 && (
                                            <button type="button" className="btn btn-outline-danger" onClick={() => removeItem('soft_skills', index)}>
                                                <i className="bi bi-dash-lg"></i>
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => addItem('soft_skills')}>
                                    <i className="bi bi-plus-lg me-2"></i>Add Skill
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold d-block">Achievements</label>
                            {data.achievements.map((ach, index) => (
                                <div key={index} className="d-flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        className="form-control border-2"
                                        value={ach}
                                        onChange={(e) => handleArrayChange('achievements', index, e.target.value)}
                                        required
                                    />
                                    {data.achievements.length > 1 && (
                                        <button type="button" className="btn btn-outline-danger" onClick={() => removeItem('achievements', index)}>
                                            <i className="bi bi-dash-lg"></i>
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => addItem('achievements')}>
                                <i className="bi bi-plus-lg me-2"></i>Add Achievement
                            </button>
                        </div>

                        <button type="submit" className="btn btn-primary px-5 py-3 shadow-sm" disabled={processing}>
                            {processing ? 'Saving...' : 'Save About Settings'}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Edit;
