import "next-auth";

declare module "next-auth" {
  interface User {
    role?: string; // Agregar propiedad `role` al usuario
    position?: string;
  }

  interface Session {
    user: {
      email: string;
      name: string;
      image: string;
      position?: string;
      role?: string;
    };
  }

  interface JWT {
    role?: string; // Agregar propiedad `role` al token JWT
    position?: string;
  }
}
