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
  companyName?: string;
  managementName?: string;
  users_management?: {
    management: {
      name: string;
      company: {
        name: string;
      };
    };
  }[];
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
        
        {/* Mostrar compañía si el rol es Cliente (6) o Cliente-Gerente (2) */}
        {(userData.roles?.nombre === "client" || userData.roles?.nombre === "Cliente-Gerente") && (
          <p><strong>Compañía:</strong> {userData.users_management?.[0]?.management?.company?.name || "Sin compañía"}</p>
        )}
        
        {/* Mostrar jefatura solo si el rol es Cliente (6) */}
        {userData.roles?.nombre === "client" && (
          <p><strong>Jefatura:</strong> {userData.users_management?.[0]?.management?.name || "Sin jefatura"}</p>
        )}
      </div>
      <div className="button-container-idadmin">
        <Button text="Modificar" type="primary" onClick={handleEditUser} />
      </div>
    </div>
  );
}
