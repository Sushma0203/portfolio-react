import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { serializeBigInt } from '@/lib/serialize';

export async function GET(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = 10;
        const skip = (page - 1) * limit;

        const [messages, total] = await Promise.all([
            prisma.contacts.findMany({
                orderBy: { created_at: 'desc' },
                skip,
                take: limit,
            }),
            prisma.contacts.count(),
        ]);

        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
            data: serializeBigInt(messages),
            current_page: page,
            last_page: totalPages,
            total,
            per_page: limit,
            links: [
                { url: page > 1 ? `/api/admin/messages?page=${page - 1}` : null, label: '&laquo; Previous', active: false },
                ...Array.from({ length: totalPages }, (_, i) => ({
                    url: `/api/admin/messages?page=${i + 1}`,
                    label: (i + 1).toString(),
                    active: i + 1 === page
                })),
                { url: page < totalPages ? `/api/admin/messages?page=${page + 1}` : null, label: 'Next &raquo;', active: false }
            ]
        });
    } catch (error) {
        console.error('Messages list error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
