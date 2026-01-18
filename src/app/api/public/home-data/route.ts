import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { serializeBigInt } from '@/lib/serialize';

export async function GET() {
    try {
        const info = await prisma.home_infos.findFirst();

        const defaultInfo = {
            hero_title: "Hello, I'm Sushma Thapa",
            hero_subtitle: "Laravel Developer",
            typed_strings: ["Laravel Developer", "Frontend Designer", "Tech Enthusiast"],
            profile_image: '/img/profile.jpg',
        };

        return NextResponse.json({
            info: info ? serializeBigInt(info) : defaultInfo
        });
    } catch (error) {
        console.error('Error fetching home data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
