import React from 'react';
import Sidebar from '@/components/Admin/Sidebar';
import Topbar from '@/components/Admin/Topbar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-body selection:bg-indigo-100 selection:text-indigo-900">
            {/* Soft Ambient Decorations */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-200/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"></div>

            <Sidebar />

            <div className="relative flex-1 flex flex-col overflow-hidden z-10 transition-all duration-300">
                <Topbar title="Admin Panel" />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50/50 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
