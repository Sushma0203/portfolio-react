import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import { login } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        const admin = await prisma.admin.findUnique({
            where: { username }
        });

        if (admin && admin.password === password) {
            await login(admin);
            return NextResponse.json({
                success: true,
                user: { id: admin.id.toString(), username: admin.username }
            });
        }

        return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
