"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/Button";
import "./create.css";
import { fetchRoles } from "@/app/actions/fetchUsers";

interface Role {
  id: number;
  nombre: string;
}

export default function CreateUserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [roleId, setRoleId] = useState<number | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const data = await fetchRoles();
        console.log("Roles recuperados:", data);
        setRoles(data);
      } catch (error) {
        console.error("Error al recuperar roles:", error);
      }
    };

    loadRoles();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (roleId === null) {
      console.error("El rol debe ser seleccionado.");
      return;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, position, role_id: roleId }),
    });

    if (response.ok) {
      router.push("/admin");
    } else {
      const errorMessage = await response.text();
      console.error("Error al crear el usuario:", errorMessage);
    }
  };

  return (
    <div className="max-container-create">
      <div className="invoice-form-container-create">
        <div className="header-section-create">
          <h2>Crear Usuario</h2>
        </div>
        <div className="form-content-create">
          <form onSubmit={handleSubmit}>
            <div className="form-grid-create">
              <div className="form-group-create">
                <label>Nombre</label>
                <input
                  type="text"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group-create">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group-create">
                <label>Cargo</label>
                <input
                  type="text"
                  placeholder="Cargo"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                />
              </div>
              <div className="form-group-create">
                <label>Rol</label>
                <select value={roleId || ""} onChange={(e) => setRoleId(Number(e.target.value))} required>
                  <option value="" disabled>Selecciona un rol</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.nombre}</option>
                  ))}
                </select>
                <div className="button-container-create">
                  <Button text="Cancelar" href="/admin" type="tertiary" />
                  <Button text="Crear" type="primary" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 