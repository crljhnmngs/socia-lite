import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/feed'];

const authRoutes = ['/login', '/signup'];

export const middleware = (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get(
        'sb-ziepbuakumvtkweqtopi-auth-token'
    )?.value;

    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        if (!token) {
            // Not authenticated, redirect to login
            const loginUrl = new URL('/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    if (authRoutes.some((route) => pathname.startsWith(route))) {
        if (token) {
            // Already authenticated, redirect to dashboard
            const dashboardUrl = new URL('/feed', request.url);
            return NextResponse.redirect(dashboardUrl);
        }
    }

    return NextResponse.next();
};

export const config = {
    matcher: ['/feed/:path*', '/login', '/signup'],
};
