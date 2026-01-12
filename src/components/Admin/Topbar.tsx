'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { LogOut, ExternalLink } from 'lucide-react';

interface TopbarProps {
    title: string;
}

const Topbar = ({ title }: TopbarProps) => {
    const router = useRouter();
    const adminName = 'Admin';

    const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout');
            router.push('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <div className="flex items-center justify-between p-6 bg-transparent">
            <h1 className="text-2xl font-bold font-heading text-slate-900 tracking-tight">{title}</h1>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                        {adminName[0]}
                    </div>
                    <span className="text-sm font-bold text-slate-700">Welcome, {adminName}</span>
                </div>

                <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-colors border border-slate-200 shadow-sm"
                    title="View Site"
                >
                    <ExternalLink size={20} />
                </a>

                <button
                    onClick={handleLogout}
                    className="p-2 rounded-lg bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors border border-slate-200 shadow-sm"
                    title="Logout"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </div>
    );
};

export default Topbar;
