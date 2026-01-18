import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const runtime = 'edge';


import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { serializeBigInt } from '@/lib/serialize';
// import fs from 'fs/promises';
// import path from 'path';

export async function GET(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = 10;
        const skip = (page - 1) * limit;

        const [projects, total] = await Promise.all([
            prisma.projects.findMany({
                orderBy: { created_at: 'desc' },
                skip,
                take: limit,
            }),
            prisma.projects.count(),
        ]);

        const totalPages = Math.ceil(total / limit);

        return NextResponse.json({
            data: serializeBigInt(projects),
            current_page: page,
            last_page: totalPages,
            total,
            per_page: limit,
            links: [
                { url: page > 1 ? `/api/admin/projects?page=${page - 1}` : null, label: '&laquo; Previous', active: false },
                ...Array.from({ length: totalPages }, (_, i) => ({
                    url: `/api/admin/projects?page=${i + 1}`,
                    label: (i + 1).toString(),
                    active: i + 1 === page
                })),
                { url: page < totalPages ? `/api/admin/projects?page=${page + 1}` : null, label: 'Next &raquo;', active: false }
            ]
        });
    } catch (error) {
        console.error('Projects list error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const formData = await request.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const category = formData.get('category') as string;
        const techStackRaw = formData.get('tech_stack') as string;
        const image = formData.get('image') as File | null;

        let tech_stack = [];
        try {
            tech_stack = JSON.parse(techStackRaw);
        } catch (e) {
            // If it's not JSON, might be a single string or multiple appends.
            // For simplicity, we expect JSON string from the frontend.
        }

        let image_path = null;
        if (image && image.size > 0) {
            // const buffer = Buffer.from(await image.arrayBuffer());
            const filename = Date.now() + '_' + image.name.replace(/\s+/g, '_');
            // const uploadDir = path.join(process.cwd(), 'public/img/project');
            // await fs.mkdir(uploadDir, { recursive: true });
            // await fs.writeFile(path.join(uploadDir, filename), buffer);
            image_path = `img/project/${filename}`;
        }

        const project = await prisma.projects.create({
            data: {
                title,
                description,
                category,
                tech_stack: tech_stack as string[],
                image_path,
            }
        });

        return NextResponse.json(serializeBigInt(project));
    } catch (error) {
        console.error('Project create error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
