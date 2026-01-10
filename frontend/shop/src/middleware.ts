import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    if (req.method === "GET") {
        // Rewrite routes that match "/[...path]/edit" to "/puck/[...path]"
        if (req.nextUrl.pathname.endsWith("/edit")) {
            const pathWithoutEdit = req.nextUrl.pathname.slice(
                0,
                req.nextUrl.pathname.length - 5
            );
            const pathWithEditPrefix = `/puck${pathWithoutEdit}`;
            return NextResponse.rewrite(new URL(pathWithEditPrefix, req.url));
        }

        // Disable direct access to "/puck/[...path]" (only accessible via /edit)
        if (req.nextUrl.pathname.startsWith("/puck")) {
            // TODO: Add proper authentication check here before allowing access
            // return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return res;
}

// Configure which routes the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)",
    ],
};
