import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { serializeBigInt } from '@/lib/serialize';

export async function GET() {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const responses = await prisma.chat_bot_questions.findMany({
            orderBy: { created_at: 'desc' }
        });

        return NextResponse.json({ responses: serializeBigInt(responses) });
    } catch (error) {
        console.error('Chatbot rules error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { question, answer } = await request.json();

        const rule = await prisma.chat_bot_questions.create({
            data: { question, answer }
        });

        return NextResponse.json(serializeBigInt(rule));
    } catch (error) {
        console.error('Chatbot rule create error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
