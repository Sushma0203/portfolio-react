import React from 'react';
import Sidebar from '@/components/Admin/Sidebar';
import Topbar from '@/components/Admin/Topbar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 text-slate-800 overflow-hidden font-body selection:bg-rose-200 selection:text-rose-900">
            {/* Soft Pink Decorations */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-pink-200/40 rounded-full blur-[120px] pointer-events-none mix-blend-multiply animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-rose-200/40 rounded-full blur-[120px] pointer-events-none mix-blend-multiply animate-pulse"></div>

            <Sidebar />

            <div className="relative flex-1 flex flex-col overflow-hidden z-10 transition-all duration-300">
                <Topbar title="Admin Panel" />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
