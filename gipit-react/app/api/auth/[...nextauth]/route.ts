import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        // Verificar si el usuario existe en tu base de datos
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/byEmail/${user.email}`
        );
        const userInfo = await response.json();

        // Si no existe el usuario o no cumple requisitos, rechaza el inicio de sesión
        if (!userInfo || !userInfo.roles.nombre) {
          return false;
        }

        // Adjunta la información del usuario al objeto `user`
        user.role = userInfo.roles.nombre;
        user.position = userInfo.position;

        return true; // Permite el inicio de sesión
      } catch (error) {
        console.error("Error verificando el usuario:", error);
        return false; // Cancela el inicio de sesión en caso de error
      }
    },
    async jwt({ token, user }) {
      if (user) {
        // Agrega el rol del usuario al token si está presente
        token.role = user.role || undefined;
        token.position = user.position || undefined;
      }
      return token; // Devuelve el token actualizado
    },
    async session({ token, session }) {
      if (typeof token.role === "string") {
        session.user.role = token.role; // Transfiere el rol si es válido
      } else {
        session.user.role = undefined; // Asegura que el rol sea `undefined` si no está definido
      }
      if (typeof token.position === "string") {
        session.user.position = token.position;
      } else {
        session.user.position = undefined;
      }

      return session; // Devuelve la sesión actualizada
    },
    async redirect({ baseUrl }) {
      return baseUrl; // Redirigir siempre al baseUrl después del login
    },
  },
});

export { handler as GET, handler as POST };
