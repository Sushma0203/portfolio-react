import React, { useEffect, useState } from 'react';
import MainLayout from '../../Layouts/MainLayout';
import axios from 'axios';

export default function Contact() {
    const [data, setData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        axios.post('/api/contact-submit', data)
            .then(res => {
                setToastMessage('Message sent successfully!');
                setToastType('success');
                setShowToast(true);
                setData({ name: '', email: '', message: '' });
                setTimeout(() => setShowToast(false), 3000);
            })
            .catch(err => {
                if (err.response && err.response.data.errors) {
                    setErrors(err.response.data.errors);
                } else {
                    setToastMessage('Something went wrong.');
                    setToastType('danger');
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 3000);
                }
            })
            .finally(() => {
                setProcessing(false);
            });
    };

    return (
        <MainLayout title="Contact">
            <style>{`
                .glass-card {
                    border-radius: 20px;
                    background: rgba(200, 162, 255, 0.25);
                    backdrop-filter: blur(15px);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .glass-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                }
                .fade-in { animation: fadeInUp 1s forwards; }
                @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
            `}</style>

            <div className="container py-5">
                <h2 className="fw-bold text-center mb-5 fade-in">Contact Me</h2>

                <div className="row g-4">
                    <div className="col-md-6 fade-in">
                        <div className="card p-4 shadow-lg glass-card h-100">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label fw-semibold">Name</label>
                                    <input
                                        type="text"
                                        className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
                                        id="name"
                                        placeholder="Your Name"
                                        value={data.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold">Email</label>
                                    <input
                                        type="email"
                                        className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        placeholder="Your Email"
                                        value={data.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label fw-semibold">Message</label>
                                    <textarea
                                        className={`form-control form-control-lg ${errors.message ? 'is-invalid' : ''}`}
                                        id="message"
                                        rows="5"
                                        placeholder="Write your message..."
                                        value={data.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                    {errors.message && <div className="invalid-feedback">{errors.message[0]}</div>}
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg w-100" disabled={processing}>
                                    {processing ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="col-md-6 fade-in">
                        <div className="card shadow-lg glass-card p-0 overflow-hidden h-100">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.123456789!2d85.287!3d27.742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb123456789%3A0xabcdef123456!2sBishankhu%20Narayan%20Mandir!5e0!3m2!1sen!2snp!4v1234567890"
                                width="100%" height="100%" style={{ border: 0, minHeight: '400px' }} allowFullScreen="" loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

            {showToast && (
                <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050 }}>
                    <div className={`toast show align-items-center text-white bg-${toastType} border-0`} role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="d-flex">
                            <div className="toast-body">
                                {toastMessage}
                            </div>
                            <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => setShowToast(false)}></button>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
