import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import axios from 'axios';

const Edit = () => {
    const [data, setData] = useState({
        hero_title: '',
        profile_image: null,
        typed_strings: ['']
    });
    const [existingImage, setExistingImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        axios.get('/api/admin/home-info/edit')
            .then(res => {
                const info = res.data.info;
                setData({
                    hero_title: info.hero_title || '',
                    profile_image: null,
                    typed_strings: info.typed_strings || ['']
                });
                setExistingImage(info.profile_image);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleTypedChange = (index, value) => {
        const newTyped = [...data.typed_strings];
        newTyped[index] = value;
        setData({ ...data, typed_strings: newTyped });
    };

    const addTyped = () => {
        setData({ ...data, typed_strings: [...data.typed_strings, ''] });
    };

    const removeTyped = (index) => {
        const newTyped = data.typed_strings.filter((_, i) => i !== index);
        setData({ ...data, typed_strings: newTyped });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        setSuccessMsg('');

        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('hero_title', data.hero_title);
        if (data.profile_image) formData.append('profile_image', data.profile_image);
        data.typed_strings.forEach((str, index) => {
            formData.append(`typed_strings[${index}]`, str);
        });

        axios.post('/api/admin/home-info', formData)
            .then(res => {
                setSuccessMsg('Home information updated successfully!');
                if (res.data.profile_image) setExistingImage(res.data.profile_image);
                setTimeout(() => setSuccessMsg(''), 3000);
            })
            .catch(err => {
                if (err.response && err.response.data.errors) {
                    setErrors(err.response.data.errors);
                } else {
                    alert('Error updating home info');
                }
            })
            .finally(() => setProcessing(false));
    };

    if (loading) return <AdminLayout title="Edit Home Info"><div>Loading...</div></AdminLayout>;

    return (
        <AdminLayout title="Edit Home Info">
            <div className="container-fluid p-4">
                <h2 className="fw-bold mb-4">Edit Home Section</h2>

                {successMsg && (
                    <div className="alert alert-success shadow-sm mb-4 border-0 rounded-3">
                        <i className="bi bi-check-circle-fill me-2"></i>{successMsg}
                    </div>
                )}

                <div className="glass-card shadow-sm p-4 col-lg-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4 text-center">
                            <label className="form-label fw-bold d-block">Profile Image Preview</label>
                            <img
                                src={data.profile_image ? URL.createObjectURL(data.profile_image) : (existingImage ? `/${existingImage}` : '/img/profile.jpg')}
                                alt="Profile"
                                className="rounded-circle shadow-lg mb-3"
                                style={{ width: '150px', height: '150px', objectFit: 'cover', border: '4px solid #fff' }}
                            />
                            <div className="mt-2 mx-auto" style={{ maxWidth: '300px' }}>
                                <input
                                    type="file"
                                    className={`form-control ${errors.profile_image ? 'is-invalid' : ''}`}
                                    onChange={(e) => setData({ ...data, profile_image: e.target.files[0] })}
                                />
                                {errors.profile_image && <div className="invalid-feedback">{errors.profile_image[0]}</div>}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold">Hero Title</label>
                            <input
                                type="text"
                                className={`form-control border-2 ${errors.hero_title ? 'is-invalid' : ''}`}
                                value={data.hero_title}
                                onChange={(e) => setData({ ...data, hero_title: e.target.value })}
                                required
                            />
                            {errors.hero_title && <div className="invalid-feedback">{errors.hero_title[0]}</div>}
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold d-block">Typing Animation Phrases</label>
                            {data.typed_strings.map((str, index) => (
                                <div key={index} className="d-flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        className="form-control border-2"
                                        value={str}
                                        onChange={(e) => handleTypedChange(index, e.target.value)}
                                        placeholder="e.g. Creative Developer"
                                        required
                                    />
                                    {data.typed_strings.length > 1 && (
                                        <button type="button" className="btn btn-outline-danger" onClick={() => removeTyped(index)}>
                                            <i className="bi bi-dash-lg"></i>
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button type="button" className="btn btn-outline-purple btn-sm" style={{ color: '#6f42c1', borderColor: '#6f42c1' }} onClick={addTyped}>
                                <i className="bi bi-plus-lg me-2"></i>Add Phrase
                            </button>
                        </div>

                        <hr className="my-5 opacity-10" />

                        <button type="submit" className="btn btn-primary px-5 py-3 shadow-lg rounded-3 fw-bold" disabled={processing}>
                            {processing ? (
                                <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Saving Changes...</>
                            ) : 'Save Home Settings'}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Edit;
