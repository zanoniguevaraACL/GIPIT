"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/atoms/Button";
import { fetchUserDetails } from "@/app/actions/fetchUserDetails"; // Asegúrate de tener esta función para obtener los detalles del usuario
import './userid.css'; // Importa el CSS

// Define la interfaz para los datos del usuario
interface UserData {
  name: string;
  email: string;
  position: string;
  role: string;
  is_active: boolean;
  roles?: { nombre: string };
}

export default function UserDetailsPage() {
  const { userId } = useParams();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserDetails(userId as string);
        setUserData(data);
      } catch (error) {
        console.error("Error al cargar los detalles del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [userId]);

  const handleDisableUser = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_active: false }), // Cambia el estado a false
      });

      if (response.ok) {
        // Aquí puedes manejar la respuesta, como redirigir o mostrar un mensaje
        console.log("Usuario deshabilitado con éxito");
      } else {
        const errorMessage = await response.text();
        console.error("Error al deshabilitar el usuario:", errorMessage);
      }
    } catch (error) {
      console.error("Error al deshabilitar el usuario:", error);
    }
  };

  const handleEditUser = () => {
    router.push(`/admin/${userId}/edit`); // Redirige a la página de edición
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!userData) {
    return <div>No se encontró el usuario.</div>;
  }

  return (
    <div className="user-details-container-idadmin">
      <h1>Detalles del Usuario</h1>
      <div>
        <p><strong>Nombre:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Cargo:</strong> {userData.position}</p>
        <p><strong>Rol:</strong> {userData.roles?.nombre || "Sin rol"}</p>
        <p><strong>Estado:</strong> {userData.is_active ? "Activo" : "Inactivo"}</p>
      </div>
      <div className="button-container-idadmin">
        <Button text="Deshabilitar" type="secondary" onClick={handleDisableUser} />
        <Button text="Modificar" type="primary" onClick={handleEditUser} />
      </div>
    </div>
  );
}
