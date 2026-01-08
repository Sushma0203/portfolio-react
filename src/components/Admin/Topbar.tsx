'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';

interface TopbarProps {
    title: string;
}

const Topbar = ({ title }: TopbarProps) => {
    const router = useRouter();
    const adminName = 'Admin';

    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.toggle('active');
    };

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout');
            router.push('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <div className="navbar-top">
            <div className="d-flex align-items-center gap-3">
                <button className="btn btn-light d-lg-none" id="sidebarToggle" onClick={toggleSidebar}>
                    <i className="bi bi-list fs-4"></i>
                </button>
                <h5 className="mb-0 fw-bold d-none d-sm-block">{title}</h5>
            </div>
            <div className="d-flex align-items-center">
                <span className="me-3 text-muted small d-none d-md-inline">Welcome, {adminName}</span>
                <a href="/" target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary border-2 px-3 me-2 text-decoration-none">View Site</a>
                <button onClick={handleLogout} className="btn btn-sm btn-outline-danger border-2 px-3">Logout</button>
            </div>
        </div>
    );
};

export default Topbar;
