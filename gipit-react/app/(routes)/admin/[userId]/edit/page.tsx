"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import './editUser.css';

interface Role {
  id: number;
  nombre: string;
}

interface UserData {
  name: string;
  email: string;
  position: string;
  role_id: number | null;
  role_name: string;
}

function EditUserPage() {
  const { userId } = useParams();
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    position: "",
    role_id: null,
    role_name: "",
  });
  const [roles, setRoles] = useState<Role[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`);
      const data = await response.json();
      setUserData(data);
    };

    const fetchRoles = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/roles`);
      const data = await response.json();
      setRoles(data);
    };

    fetchUserData();
    fetchRoles();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { role_name, ...userDataWithoutRoleName } = userData;

    const dataToSend = {
      ...userDataWithoutRoleName,
      roles: { nombre: role_name },
    };

    console.log("Datos a enviar:", dataToSend);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      router.push("/admin");
    } else {
      console.error("Error al actualizar el usuario");
    }
  };

  return (
    <div className="max-container-adedit">
      <div className="invoice-form-container-adedit">
        <div className="header-section-adedit">
          <h2>Editar Usuario</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-grid-adedit">
            <div className="form-group-adedit">
              <label>Nombre</label>
              <input
                type="text"
                placeholder="Nombre"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group-adedit">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group-adedit">
              <label>Cargo</label>
              <input
                type="text"
                placeholder="Cargo"
                value={userData.position}
                onChange={(e) => setUserData({ ...userData, position: e.target.value })}
                required
              />
            </div>
            <div className="form-group-adedit">
              <label>Rol</label>
              <select
                value={userData.role_id || ""}
                onChange={(e) => {
                  const selectedRoleId = Number(e.target.value);
                  const selectedRole = roles.find(role => role.id === selectedRoleId);
                  console.log("Rol seleccionado ID:", selectedRoleId);
                  if (selectedRole) {
                    console.log("Rol seleccionado nombre:", selectedRole.nombre);
                    setUserData({ 
                      ...userData, 
                      role_id: selectedRoleId,
                      role_name: selectedRole.nombre
                    });
                  }
                }}
                required
              >
                <option value="" disabled>Selecciona un rol</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.nombre}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="button-container-adedit">
            <button type="submit">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserPage; 