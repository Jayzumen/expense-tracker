import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Set the paths that don't require the user to be signed in
const publicPaths = ["/", "/sign-in*", "/sign-up*"];

const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace("*$", "($|/)")))
  );
};

export default withClerkMiddleware((request: NextRequest) => {
  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  // if the user is not signed in redirect them to the sign in page.
  const { userId } = getAuth(request);

  if (!userId) {
    // redirect the users to "/"

    const homeUrl = new URL("/", request.url);
    homeUrl.searchParams.set("redirect_url", request.url);
    return NextResponse.redirect(homeUrl);
  }
  return NextResponse.next();
});

// Stop Middleware running on static files and public folder
export const config = {
  matcher: ["/((?!_next/image|_next/static|favicon.ico|.).*)", "/"],
};