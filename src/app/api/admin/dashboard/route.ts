import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const runtime = 'edge';


import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const [galleryCount, projectCount, messageCount] = await Promise.all([
            prisma.galleries.count(),
            prisma.projects.count(),
            prisma.contacts.count()
        ]);

        return NextResponse.json({
            galleryCount,
            projectCount,
            messageCount
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
