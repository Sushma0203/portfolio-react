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
            <h1 className="text-2xl font-bold font-heading text-slate-800 tracking-tight drop-shadow-sm">{title}</h1>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-3 bg-white/50 px-4 py-2 rounded-full border border-pink-200 backdrop-blur-md shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xs font-bold text-white shadow-md shadow-pink-300/50">
                        {adminName[0]}
                    </div>
                    <span className="text-sm font-bold text-slate-700">Welcome, {adminName}</span>
                </div>

                <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full bg-white/50 hover:bg-white text-pink-500 hover:text-rose-600 transition-colors border border-pink-200 shadow-sm"
                    title="View Site"
                >
                    <ExternalLink size={20} />
                </a>

                <button
                    onClick={handleLogout}
                    className="p-2 rounded-full bg-red-100/50 hover:bg-red-100 text-red-500 hover:text-red-600 transition-colors shadow-sm"
                    title="Logout"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </div>
    );
};

export default Topbar;
