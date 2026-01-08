import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [data, setData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        axios.post('/api/login', data)
            .then(res => {
                if (res.data.success) {
                    localStorage.setItem('admin_token', res.data.token);
                    navigate('/admin/dashboard');
                } else {
                    setErrors({ username: 'Invalid credentials' });
                }
            })
            .catch(err => {
                if (err.response && err.response.data.message) {
                    setErrors({ username: err.response.data.message });
                } else {
                    setErrors({ username: 'Something went wrong' });
                }
            })
            .finally(() => {
                setProcessing(false);
            });
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <div className="card shadow-lg border-0" style={{ width: '100%', maxWidth: '400px', borderRadius: '20px', overflow: 'hidden' }}>
                <div className="card-body p-5 bg-white">
                    <div className="text-center mb-4">
                        <img src="/img/sushmalogo.png" width="80" alt="Logo" className="mb-3" />
                        <h3 className="fw-bold text-dark">Admin Login</h3>
                        <p className="text-secondary small">Access your portfolio dashboard</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label small fw-bold text-uppercase">Username</label>
                            <input
                                type="text"
                                name="username"
                                className={`form-control form-control-lg border-0 bg-light ${errors.username ? 'is-invalid' : ''}`}
                                placeholder="Enter username"
                                value={data.username}
                                onChange={handleChange}
                                required
                            />
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                        </div>

                        <div className="mb-4">
                            <label className="form-label small fw-bold text-uppercase">Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    className="form-control form-control-lg border-0 bg-light border-end-0"
                                    placeholder="Enter password"
                                    value={data.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    className="btn btn-light border-0"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg w-100 shadow-sm border-0 py-3"
                            style={{ background: 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)', borderRadius: '12px' }}
                            disabled={processing}
                        >
                            {processing ? 'Logging in...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
