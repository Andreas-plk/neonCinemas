import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {


    const res= NextResponse.next();
    const adminCookie = req.cookies.get('adminAccess')


    if (req.nextUrl.pathname.startsWith('/admin/dashboard')) {
        if (!adminCookie || adminCookie.value !== 'True') {
            const loginUrl = new URL('/', req.url);
            return NextResponse.redirect(loginUrl);
        }

    }

    return res;
}

export const config = {
    matcher: ['/:path*'],
};
