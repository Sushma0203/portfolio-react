import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from './lib/auth';

export async function middleware(request: NextRequest) {
    const session = await getSession();

    // If trying to access admin routes and no session, redirect to login
    if (request.nextUrl.pathname.startsWith('/admin') && !session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // If already logged in and trying to access login page, redirect to dashboard
    if (request.nextUrl.pathname === '/login' && session) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/login'],
};

export const runtime = 'experimental-edge';
