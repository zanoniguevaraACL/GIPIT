"use client";
import { signOut } from "next-auth/react";

function page() {
  signOut({ callbackUrl: "/api/auth/signin" }); // si entras a notifications se cierra la sesion es porque estoy probando la funcion aqui
  return <div>Notifications</div>;
}

export default page;
