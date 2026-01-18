import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'admin_session';

export async function login(user: any) {
    // const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day - Unused

    // Create the session data
    const sessionData = JSON.stringify(user);

    // Set the cookie
    // IMPORTANT: Adding 'expires' or 'maxAge' makes it persistent.
    // REMOVING 'expires' makes it a session cookie (deleted on browser close).
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, sessionData, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        // No 'expires' or 'maxAge' -> Session Cookie
    });
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE_NAME);
    if (!session) return null;
    try {
        return JSON.parse(session.value);
    } catch {
        return null;
    }
}
