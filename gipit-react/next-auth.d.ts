import "next-auth";

declare module "next-auth" {
  interface User {
    role?: string; // Agregar propiedad `role` al usuario
  }

  interface Session {
    user: {
      email: string;
      name: string;
      image: string;
      role?: string;
    };
  }

  interface JWT {
    role?: string; // Agregar propiedad `role` al token JWT
  }
}
