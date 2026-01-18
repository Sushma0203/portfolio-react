import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { serializeBigInt } from '@/lib/serialize';

export async function GET() {
    try {
        const info = await prisma.home_infos.findFirst();
        console.log('Home Info fetched:', info ? 'Found in DB' : 'Not found in DB, using defaults');

        const defaultInfo = {
            hero_title: "Hello, I'm Sushma Thapa",
            hero_subtitle: "Laravel Developer",
            typed_strings: ["Laravel Developer", "Frontend Designer", "Tech Enthusiast"],
            profile_image: '/img/profile.jpg',
        };

        return NextResponse.json({
            info: info ? serializeBigInt(info) : defaultInfo
        });
    } catch (error: any) {
        console.error('Error fetching home data:', error);
        return NextResponse.json({
            error: 'Database Error',
            details: error.message || 'Unknown error'
        }, { status: 500 });
    }
}
