// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

export { default } from "next-auth/middleware"
export const config = {
    matcher: ['/general/:path*', '/analytics/:path*', '/api/:path*'],
}

// export function middleware(request: NextRequest) {
//     if (request.nextUrl.pathname.startsWith('/dashboard')) {
//         return NextResponse.rewrite(new URL('/dashboard/user', request.url))
//     }
// }