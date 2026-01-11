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
        if (req.nextUrl.pathname.startsWith("/puck") || req.nextUrl.pathname.endsWith("/edit")) {
            const authCredCookie = req.cookies.get("AUTH_CRED_SHOP");
            let isAuthorized = false;

            if (authCredCookie?.value) {
                try {
                    const { permissions } = JSON.parse(authCredCookie.value);
                    // Check if 'editor' is in permissions or role
                    // Based on my research, the backend might send role as a permission or in a different field.
                    // But the frontend types suggest 'role' is a field in the user object.
                    // However, auth-utils.ts suggests permissions are stored in AUTH_CRED.

                    // Actually, let's look at how permissions are used in auth-utils.ts
                    // roles are compared against permissions.

                    if (permissions && Array.isArray(permissions) && permissions.includes("editor")) {
                        isAuthorized = true;
                    }
                } catch (e) {
                    console.error("Error parsing auth credentials in middleware", e);
                }
            }

            if (!isAuthorized) {
                // If the user is trying to access an edit route, redirect to signin
                const signinUrl = new URL("/signin", req.url);
                signinUrl.searchParams.set("redirect_to", req.nextUrl.pathname);
                return NextResponse.redirect(signinUrl);
            }
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
