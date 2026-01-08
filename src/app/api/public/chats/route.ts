import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
import { serializeBigInt } from '@/lib/serialize';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        const cookieStore = await cookies();
        let sessionId = cookieStore.get('chat_session_id')?.value;

        if (!sessionId) {
            return NextResponse.json([]);
        }

        const chats = await prisma.chats.findMany({
            where: { session_id: sessionId },
            orderBy: { created_at: 'asc' }
        });

        return NextResponse.json(serializeBigInt(chats));
    } catch (error) {
        console.error('Error fetching chats:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { message } = await request.json();
        const cookieStore = await cookies();
        let sessionId = cookieStore.get('chat_session_id')?.value;

        if (!sessionId) {
            sessionId = Math.random().toString(36).substring(7);
            // Set cookie for 1 day
            cookieStore.set('chat_session_id', sessionId, { maxAge: 86400 });
        }

        // 1. Save user message
        const chat = await prisma.chats.create({
            data: {
                session_id: sessionId,
                message: message,
                is_admin: false,
                is_read: false
            }
        });

        // 2. Check for auto-response
        const botQuestions = await prisma.chat_bot_questions.findMany();
        for (const bq of botQuestions) {
            if (message.toLowerCase().includes(bq.question.toLowerCase())) {
                await prisma.chats.create({
                    data: {
                        session_id: sessionId,
                        message: bq.answer,
                        is_admin: true,
                        is_read: true
                    }
                });
                break;
            }
        }

        return NextResponse.json(serializeBigInt(chat));
    } catch (error) {
        console.error('Error saving chat:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
