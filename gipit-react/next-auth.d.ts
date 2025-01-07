import "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    position?: string;
    managements?: {
      id: number;
      name: string;
      company: {
        id: number;
        name: string;
      };
    }[];
  }

  interface Session {
    user: {
      email: string;
      name: string;
      image: string;
      position?: string;
      role?: string;
      managements?: {
        id: number;
        name: string;
        company: {
          id: number;
          name: string;
        };
      }[];
    };
  }

  interface JWT {
    role?: string;
    position?: string;
    managements?: {
      id: number;
      name: string;
      company: {
        id: number;
        name: string;
      };
    }[];
  }
}