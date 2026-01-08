import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { serializeBigInt } from '@/lib/serialize';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = 12;
        const skip = (page - 1) * limit;

        const [images, total] = await Promise.all([
            prisma.galleries.findMany({
                orderBy: { created_at: 'desc' },
                skip,
                take: limit,
            }),
            prisma.galleries.count(),
        ]);

        const totalPages = Math.ceil(total / limit);

        // Replicate Laravel-like pagination structure if possible, 
        // or just send standard meta data.
        return NextResponse.json({
            data: serializeBigInt(images),
            current_page: page,
            last_page: totalPages,
            total,
            per_page: limit,
            // Simplified links for the Pagination component
            links: [
                { url: page > 1 ? `/api/admin/gallery?page=${page - 1}` : null, label: '&laquo; Previous', active: false },
                ...Array.from({ length: totalPages }, (_, i) => ({
                    url: `/api/admin/gallery?page=${i + 1}`,
                    label: (i + 1).toString(),
                    active: i + 1 === page
                })),
                { url: page < totalPages ? `/api/admin/gallery?page=${page + 1}` : null, label: 'Next &raquo;', active: false }
            ]
        });
    } catch (error) {
        console.error('Gallery list error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const formData = await request.formData();
        const image = formData.get('image') as File;
        const title = formData.get('title') as string;

        if (!image) {
            return NextResponse.json({ error: 'Image is required' }, { status: 400 });
        }

        const buffer = Buffer.from(await image.arrayBuffer());
        const filename = Date.now() + '_' + image.name.replace(/\s+/g, '_');
        const uploadDir = path.join(process.cwd(), 'public/img/gallery');

        // Ensure directory exists
        await fs.mkdir(uploadDir, { recursive: true });

        const filePath = path.join(uploadDir, filename);
        await fs.writeFile(filePath, buffer);

        const dbPath = `img/gallery/${filename}`;

        const gallery = await prisma.galleries.create({
            data: {
                image_path: dbPath,
                title: title || null,
            }
        });

        return NextResponse.json(serializeBigInt(gallery));
    } catch (error) {
        console.error('Gallery upload error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
