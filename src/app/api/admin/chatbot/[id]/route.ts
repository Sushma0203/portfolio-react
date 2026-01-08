import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';
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
        const rule = await prisma.chat_bot_questions.findUnique({
            where: { id }
        });

        if (!rule) {
            return NextResponse.json({ error: 'Rule not found' }, { status: 404 });
        }

        return NextResponse.json({ response: serializeBigInt(rule) });
    } catch (error) {
        console.error('Chatbot rule show error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id: rawId } = await context.params;
        const session = await getSession();
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const id = BigInt(rawId);
        const { question, answer } = await request.json();

        const rule = await prisma.chat_bot_questions.update({
            where: { id },
            data: { question, answer }
        });

        return NextResponse.json(serializeBigInt(rule));
    } catch (error) {
        console.error('Chatbot rule update error:', error);
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
        await prisma.chat_bot_questions.delete({
            where: { id }
        });

        return NextResponse.json({ message: 'Rule deleted successfully' });
    } catch (error) {
        console.error('Chatbot rule delete error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
