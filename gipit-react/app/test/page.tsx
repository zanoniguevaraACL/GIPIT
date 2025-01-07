'use client';

import { useSession } from "next-auth/react";

export default function TestPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Cargando...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">No has iniciado sesión</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Página de Prueba - Información de Sesión</h1>
      
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
        <section className="border-b pb-4">
          <h2 className="text-xl font-semibold mb-3">Información Básica</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Nombre:</p>
              <p>{session?.user.name}</p>
            </div>
            <div>
              <p className="font-medium">Email:</p>
              <p>{session?.user.email}</p>
            </div>
            <div>
              <p className="font-medium">Rol:</p>
              <p>{session?.user.role}</p>
            </div>
            <div>
              <p className="font-medium">Posición:</p>
              <p>{session?.user.position}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Jefaturas y Compañías</h2>
          {session?.user.managements && session.user.managements.length > 0 ? (
            <div className="grid gap-4">
              {session.user.managements.map((management) => (
                <div 
                  key={management.id}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <p className="font-medium">Jefatura: {management.name}</p>
                  <p className="text-gray-600">Compañía: {management.company.name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No hay jefaturas asignadas</p>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Datos Completos (Debug)</h2>
          <pre className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-96">
            {JSON.stringify(session, null, 2)}
          </pre>
        </section>
      </div>
    </div>
  );
}