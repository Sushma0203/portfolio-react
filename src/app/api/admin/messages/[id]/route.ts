import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export const runtime = 'edge';


import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { serializeBigInt } from '@/lib/serialize';

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id: rawId } = await context.params;
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const id = BigInt(rawId);
        const message = await prisma.contacts.findUnique({
            where: { id }
        });

        if (!message) {
            return NextResponse.json({ error: 'Message not found' }, { status: 404 });
        }

        // Mark as read if it's not
        if (!message.is_read) {
            await prisma.contacts.update({
                where: { id },
                data: { is_read: true }
            });
        }

        return NextResponse.json({ message: serializeBigInt(message) });
    } catch (error) {
        console.error('Message show error:', error);
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
        await prisma.contacts.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error('Message delete error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
