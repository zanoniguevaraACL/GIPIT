// // middleware.ts

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(req: NextRequest) {
//   // Supongamos que tienes un método para verificar si el usuario está autenticado
//   const isLoggedIn = Boolean(req.cookies.get('token')); // Ejemplo: reemplaza con tu lógica de autenticación

//   // Si el usuario no está autenticado y no está en la página de login
//   if (!isLoggedIn && !req.nextUrl.pathname.startsWith('/login')) {
//     // Redirige al login
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   // Permite la solicitud
//   return NextResponse.next();
// }

// // Especifica en qué rutas aplicar el middleware
// export const config = {
//   matcher: ['/((?!api|_next|static|login).*)'],
// };

// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Intenta obtener el token JWT para verificar la autenticación
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Si no hay token y la ruta no es '/login', redirige al login
  if (!token && req.nextUrl.pathname !== '/login') {
    const signInUrl = new URL('/api/auth/signin', req.url);
    signInUrl.searchParams.set('callbackUrl', req.url); // Redirige de nuevo a la página actual tras el login
    return NextResponse.redirect(signInUrl);
  }

  // Permite la solicitud
  return NextResponse.next();
}

// Especifica en qué rutas aplicar el middleware
export const config = {
  matcher: ['/((?!api|_next|static|login).*)'],
};
