import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const runtime = 'edge';


import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { serializeBigInt } from '@/lib/serialize';
// import fs from 'fs/promises';
// import path from 'path';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id: rawId } = await context.params;
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const id = BigInt(rawId);
        const project = await prisma.projects.findUnique({
            where: { id }
        });

        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        return NextResponse.json({ project: serializeBigInt(project) });
    } catch (error) {
        console.error('Project show error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    // We use POST for update to handle multipart/form-data easily with image upload
    try {
        const { id: rawId } = await context.params;
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const id = BigInt(rawId);
        const existingProject = await prisma.projects.findUnique({
            where: { id }
        });

        if (!existingProject) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        const formData = await request.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const category = formData.get('category') as string;
        const techStackRaw = formData.get('tech_stack') as string;
        const image = formData.get('image') as File | null;

        let tech_stack = existingProject.tech_stack;
        if (techStackRaw) {
            try {
                tech_stack = JSON.parse(techStackRaw);
            } catch (e) { }
        }

        let image_path = existingProject.image_path;
        if (image && image.size > 0) {
            // Delete old image
            if (existingProject.image_path) {
                // const oldPath = path.join(process.cwd(), 'public', existingProject.image_path);
                // try { await fs.unlink(oldPath); } catch (e) { }
            }

            // const buffer = Buffer.from(await image.arrayBuffer());
            const filename = Date.now() + '_' + image.name.replace(/\s+/g, '_');
            // const uploadDir = path.join(process.cwd(), 'public/img/project');
            // await fs.mkdir(uploadDir, { recursive: true });
            // await fs.writeFile(path.join(uploadDir, filename), buffer);
            image_path = `img/project/${filename}`;
        }

        const updatedProject = await prisma.projects.update({
            where: { id },
            data: {
                title: title || existingProject.title,
                description: description || existingProject.description,
                category: category || existingProject.category,
                tech_stack: tech_stack as string[],
                image_path,
            }
        });

        return NextResponse.json(serializeBigInt(updatedProject));
    } catch (error) {
        console.error('Project update error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id: rawId } = await context.params;
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const id = BigInt(rawId);
        const project = await prisma.projects.findUnique({
            where: { id }
        });

        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        if (project.image_path) {
            // const filePath = path.join(process.cwd(), 'public', project.image_path);
            // try { await fs.unlink(filePath); } catch (e) { }
        }

        await prisma.projects.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Project delete error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
