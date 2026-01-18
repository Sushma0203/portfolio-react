import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id: rawId } = await context.params;
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const id = BigInt(rawId);
        const gallery = await prisma.galleries.findUnique({
            where: { id }
        });

        if (!gallery) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        // Delete file
        const filePath = path.join(process.cwd(), 'public', gallery.image_path);
        try {
            await fs.unlink(filePath);
        } catch (err) {
            console.warn('Could not delete file from filesystem:', filePath);
        }

        // Delete from DB
        await prisma.galleries.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Gallery delete error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
