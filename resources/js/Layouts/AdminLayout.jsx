import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from '../Components/Admin/Sidebar';
import Topbar from '../Components/Admin/Topbar';
import '../../css/admin.css';

const AdminLayout = ({ children, title = 'Dashboard' }) => {
    const [flash, setFlash] = useState(null);
    // In a real app, flash messages could come from a global context or hook
    // For now, we'll keep it as a placeholder for consistency with the old layout

    return (
        <div className="admin-wrapper">
            <Sidebar />

            <div id="content">
                <Topbar title={title} />

                {flash?.success && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {flash.success}
                        <button type="button" className="btn-close" onClick={() => setFlash(null)}></button>
                    </div>
                )}

                {flash?.error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        {flash.error}
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                )}

                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
