import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { serializeBigInt } from '@/lib/serialize';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        let info = await prisma.home_infos.findFirst();
        if (!info) {
            info = await prisma.home_infos.create({
                data: { hero_title: 'Sushma Thapa', typed_strings: ['Developer'] }
            });
        }

        return NextResponse.json({ info: serializeBigInt(info) });
    } catch (error) {
        console.error('Home info get error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const formData = await request.formData();
        const hero_title = formData.get('hero_title') as string;
        const typedStringsRaw = formData.get('typed_strings') as string;
        const image = formData.get('profile_image') as File | null;

        let typed_strings = [];
        try {
            typed_strings = JSON.parse(typedStringsRaw);
        } catch (e) { }

        let info = await prisma.home_infos.findFirst();
        if (!info) {
            info = await prisma.home_infos.create({
                data: { hero_title: 'Default', typed_strings: [] }
            });
        }

        let profile_image = info.profile_image;
        if (image && image.size > 0) {
            if (info.profile_image) {
                const oldPath = path.join(process.cwd(), 'public', info.profile_image);
                try { await fs.unlink(oldPath); } catch (e) { }
            }

            const buffer = Buffer.from(await image.arrayBuffer());
            const filename = Date.now() + '_' + image.name.replace(/\s+/g, '_');
            const uploadDir = path.join(process.cwd(), 'public/img');
            await fs.mkdir(uploadDir, { recursive: true });
            await fs.writeFile(path.join(uploadDir, filename), buffer);
            profile_image = `img/${filename}`;
        }

        const updatedInfo = await prisma.home_infos.update({
            where: { id: info.id },
            data: {
                hero_title: hero_title || info.hero_title,
                typed_strings: typed_strings as any,
                profile_image,
            }
        });

        return NextResponse.json({ info: serializeBigInt(updatedInfo), message: 'Home info updated' });
    } catch (error) {
        console.error('Home info update error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
