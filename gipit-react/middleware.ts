import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Si no hay token y la ruta no es '/login', redirige al login
  if (!token && req.nextUrl.pathname !== "/api/auth/signin") {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  return NextResponse.next();
}

// Especifica en qué rutas aplicar el middleware
export const config = {
  matcher: ["/((?!api|_next|static|login).*)"], // Aplica a todas las rutas excepto las mencionadas
};
