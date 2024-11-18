import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  try {
    // Intenta obtener el token JWT para verificar la autenticación
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Si no hay token y la ruta no es '/login', redirige al login
    if (!token && req.nextUrl.pathname !== "/login") {
      const signInUrl = new URL("/api/auth/signin", req.url);
      signInUrl.searchParams.set("callbackUrl", req.url); // Redirige de nuevo a la página actual tras el login
      return NextResponse.redirect(signInUrl);
    }

    // Si el token existe, pero la ruta es una de las protegidas, verifica el rol
    if (token && typeof token.email === "string") {
      const email = String(token.email).trim();
      console.log('aqui va el mail del token: '+ email)

      // Solo realiza la solicitud si la ruta es una de las protegidas
      const protectedRoutes: { path: string; roles: string[] }[] = [
        { path: "/protegida/admino", roles: ["admin"] },
        { path: "/protegida/kam", roles: ["kam"] },
        { path: "/protegida/user", roles: ["user"] },
      ];

      const matchedRoute = protectedRoutes.find((route) =>
        req.nextUrl.pathname.startsWith(route.path)
      );

      if (matchedRoute) {
        // Realiza una solicitud al backend para obtener el usuario por email
        const response = await fetch(`http://localhost:3001/api/users/byEmail/${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        

        if (!response.ok) {
          console.log('no sé nada')
          return NextResponse.redirect(new URL("/unauthorized", req.url));
        }

        const user = await response.json();
        const userRole = user.role;
        console.log('aqui va el role '+ userRole)

        // Si el rol no coincide, redirige al usuario
        if (!matchedRoute.roles.includes(userRole)) {
          return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
      }
    }

    // Permite la solicitud si la autenticación es correcta y los roles son correctos (en caso de rutas protegidas)
    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
}

// Especifica en qué rutas aplicar el middleware
export const config = {
  matcher: ["/((?!api|_next|static|login).*)"], // Aplica a todas las rutas excepto las mencionadas
};
