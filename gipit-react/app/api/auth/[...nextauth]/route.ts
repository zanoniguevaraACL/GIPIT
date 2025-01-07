import NextAuth from "next-auth";
import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";

// Define una interfaz para el tipo de management
interface Management {
  id: number;
  name: string;
  company: {
    id: number;
    name: string;
  };
}

export const authOptions: AuthOptions = {
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
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/byEmail/${user.email}`
        );
        const userInfo = await response.json();

        console.log("Usuario info", userInfo);

        if (!userInfo || !userInfo.roles.nombre) {
          return false;
        }

        const managementResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/management/${userInfo.id}`
        );
        const managementInfo = await managementResponse.json();

        user.role = userInfo.roles.nombre;
        user.position = userInfo.position;
        user.managements = managementInfo.map((um: { management: Management }) => ({
          id: um.management.id,
          name: um.management.name,
          company: {
            id: um.management.company.id,
            name: um.management.company.name,
          },
        }));

        return true;
      } catch (error) {
        console.error("Error verificando el usuario:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || undefined;
        token.position = user.position || undefined;
        token.managements = user.managements as Management[] || undefined;
      }
      return token;
    },
    async session({ token, session }) {
      if (typeof token.role === "string") {
        session.user.role = token.role;
      } else {
        session.user.role = undefined;
      }
      if (typeof token.position === "string") {
        session.user.position = token.position;
      } else {
        session.user.position = undefined;
      }
      
      session.user.managements = (token.managements as Management[]) || undefined;

      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);
export const GET = handler;
export const POST = handler;