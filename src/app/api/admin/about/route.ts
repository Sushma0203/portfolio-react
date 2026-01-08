import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { serializeBigInt } from '@/lib/serialize';

export async function GET() {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        let info = await prisma.about_infos.findFirst();
        if (!info) {
            info = await prisma.about_infos.create({
                data: { career_objective: '', technical_skills: [], soft_skills: [], achievements: [] }
            });
        }

        return NextResponse.json({ info: serializeBigInt(info) });
    } catch (error) {
        console.error('About info get error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const data = await request.json();
        let info = await prisma.about_infos.findFirst();
        if (!info) {
            info = await prisma.about_infos.create({
                data: { career_objective: '', technical_skills: [], soft_skills: [], achievements: [] }
            });
        }

        const updatedInfo = await prisma.about_infos.update({
            where: { id: info.id },
            data: {
                career_objective: data.career_objective,
                technical_skills: data.technical_skills as any,
                soft_skills: data.soft_skills as any,
                achievements: data.achievements as any,
            }
        });

        return NextResponse.json({ info: serializeBigInt(updatedInfo), message: 'About info updated' });
    } catch (error) {
        console.error('About info update error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
