import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const runtime = 'edge';


import { prisma } from '@/lib/prisma';
import { serializeBigInt } from '@/lib/serialize';

export async function GET() {
    try {
        const info = await prisma.about_infos.findFirst();
        console.log('About Info fetched:', info ? 'Found in DB' : 'Not found in DB, using defaults');

        const defaultInfo = {
            career_objective: "To commit a professional job utilizing my field of study and gain work experience for future assiduous.",
            education_details: [
                { degree: "BIM", school: "St. Xavier's College", year: "Present" },
                { degree: "Till Grade 12", school: "St. Mary's High School", year: "2021" }
            ],
            technical_skills: ['Programming', 'Tools', 'Software'],
            soft_skills: ['Communication', 'Teamwork', 'Languages: English, Nepali, Hindi'],
            achievements: ['Scholarships', 'GPA honors', 'Volunteer work', 'Leadership roles']
        };

        return NextResponse.json({
            info: info ? serializeBigInt(info) : defaultInfo
        });
    } catch (error: any) {
        console.error('Error fetching about data:', error);
        return NextResponse.json({
            error: 'Database Error',
            details: error.message || 'Unknown error',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}
