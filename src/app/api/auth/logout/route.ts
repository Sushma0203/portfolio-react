import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const runtime = 'edge';


import { logout } from '@/lib/auth';

export async function POST() {
    await logout();
    return NextResponse.json({ success: true });
}
