import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import { serializeBigInt } from '@/lib/serialize';

export async function GET() {
    try {
        const info = await prisma.about_infos.findFirst();

        const defaultInfo = {
            career_objective: "To commit a professional job utilizing my field of study and gain work experience for future assiduous.",
            technical_skills: ['Programming', 'Tools', 'Software'],
            soft_skills: ['Communication', 'Teamwork'],
            achievements: ['Scholarships & GPA honors', 'Volunteer work', 'Leadership roles']
        };

        return NextResponse.json({
            info: info ? serializeBigInt(info) : defaultInfo
        });
    } catch (error) {
        console.error('Error fetching about data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
