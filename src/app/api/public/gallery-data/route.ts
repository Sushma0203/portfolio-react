import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { serializeBigInt } from '@/lib/serialize';

export async function GET() {
    try {
        let images = await prisma.galleries.findMany({
            orderBy: { created_at: 'desc' }
        });

        // In a real Next.js app, we'd need to handle fs globbing differently if needed,
        // but usually, images should be in the DB.

        return NextResponse.json({
            images: serializeBigInt(images)
        });
    } catch (error: any) {
        console.error('Error fetching gallery data:', error);
        return NextResponse.json({
            error: 'Gallery Database Error',
            details: error.message || 'Unknown error'
        }, { status: 500 });
    }
}
