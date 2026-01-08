'use client';

import React from 'react';
import Sidebar from '@/components/Admin/Sidebar';
import Topbar from '@/components/Admin/Topbar';
import './admin.css';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="admin-wrapper">
            <Sidebar />
            <div id="content">
                <Topbar title="Admin Panel" />
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
